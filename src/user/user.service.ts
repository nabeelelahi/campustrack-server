import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { name, schema } from './entities/user.entity';
import { BaseService } from 'src/base/base.service';
import { strSlug } from 'utils/helpers';
import { bycryptConstants, verificationConstant } from 'config/constants';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login.dto';
import { ForgotDto } from './dto/forgot.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { baseConditionType, baseFindOneQueryType, baseFindQueryType } from '../base/base.dto';
import { ResetPaswordDto } from './dto/set-password.dto';
import { UserContext } from './user.context';
import { ChangePaswordDto } from './dto/change-password.dto';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class UserService extends BaseService<typeof schema, UserDto> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    protected userContext: UserContext,
    protected _classService: ClassService
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'role',
    'name',
    'address',
    'email',
    'username',
    'parent',
    'image_url',
    'mobile_no',
    'gender',
    'email_verified',
    'phone_verified',
    'completion_rate',
    'status',
    'slug',
    'created_at',
  ];

  protected override  _populateRelations = (
    _query: baseFindOneQueryType<typeof schema, UserDto>,
  ) => {
    // _query.populate('teacher')
  };

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, UserDto>,
    condition: baseConditionType,
  ) => {
    if (condition) {
      _query.where(condition);
      _query.where({ email: { $ne: 'admin@admin.com' } });
    }
  };

  protected override _beforeCreateHook = async (payload: Partial<UserDto>) => {
    if (payload.email) payload.email = payload.email.toLocaleLowerCase();
    const exists = await this.findOneRecord({
      [verificationConstant.mode]: payload[verificationConstant.mode],
    });
    if (exists) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: ['Email Already Exists'],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (payload['name'])
      payload['username'] = await this.generateUserName(payload['name']);
  };

  protected override _afterCreateHook = async (
    payload: Partial<UserDto>,
    record: UserDto,
  ) => {
    if (record.role === 'student')
      this._classService._model.updateMany(
        { _id: { $in: payload.classes } },
        { $push: { students: record._id } },
      )
        .then(console.log)
  };

  async login(_body: LoginDto): Promise<UserDto> {
    const user = await this.verifyCredentails(_body);
    if (!user)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: ['Invalid Credentials'],
        },
        HttpStatus.BAD_REQUEST,
      );
    const { success, message } = this.verifyStatuses(user as UserDto);
    if (!success)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: [message],
        },
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }

  async verifyCredentails(_body: LoginDto): Promise<any> {
    const users = await this._model.find({
      [verificationConstant.mode]: _body[verificationConstant.mode].toLocaleLowerCase(),
      deleted_at: null,
    });
    if (!users.length) return false;
    const [user] = users;
    const verifyPassword = bcrypt.compareSync(
      _body['password'],
      user['password'],
    );
    if (!verifyPassword) return false;
    return user;
  }

  verifyStatuses(user: UserDto): { success: boolean; message: string } {
    // if (!user.email_verified)
    //   return { success: false, message: 'Email not verified' };
    if (!user.status)
      return { success: false, message: 'Your account is deactivated' };
    return { success: true, message: 'Verified' };
  }
  async verifyCode(_body: VerifyCodeDto) {
    try {
      const verified = await this.generateReresetPasswordToken(_body);
      if (verified && typeof verified === 'string')
        return { reset_password_token: verified };
      else
        throw new HttpException(
          {
            statuCode: HttpStatus.BAD_REQUEST,
            error: 'Validation Error',
            message: ['Invalid Code'],
          },
          HttpStatus.BAD_REQUEST,
        );
    } catch (err) {
      console.log(err);
    }
  }

  async generateReresetPasswordToken(
    _body: VerifyCodeDto,
  ): Promise<boolean | string> {
    const user = await this.findOneRecord(
      {
        [_body.mode]: _body.identifier.toLocaleLowerCase(),
      },
      ['verification_code'],
    );
    if (!user) return false;
    let verifyCode: boolean;
    try {
      verifyCode = bcrypt.compareSync(
        _body['code'],
        user['verification_code'] as string,
      ) as boolean;
    } catch (error) {
      console.log(error);
      return false;
    }
    if (!verifyCode) return false;
    const reset_password_token = randomUUID();
    const payload: {
      verification_code: string;
      email_verified?: boolean;
      phone_verified?: boolean;
      reset_password_token: string;
    } = {
      verification_code: null,
      reset_password_token,
      email_verified: true,
      phone_verified: true,
    };
    await this._model.findOneAndUpdate(
      {
        [_body.mode]: _body.identifier.toLocaleLowerCase(),
      },
      { $set: payload },
    );
    return reset_password_token;
  }

  async forgotPassword(_body: ForgotDto) {
    const record = await this.findOneRecord({
      [_body.mode]: _body.identifier.toLocaleLowerCase(),
    });
    if (record) {
      this.resetVerificationCode(_body).then(() => { });
      return {};
    } else {
      const mode = _body.mode == 'email' ? 'Email Address' : 'Phone Number';
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: [`No account associate with this ${mode}!`],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async resendCode(_body: ForgotDto) {
    await this.resetVerificationCode(_body);
    return {};
  }

  async resetVerificationCode(_body: ForgotDto): Promise<object> {
    let verification_code = '0000';
    verification_code = await bcrypt.hash(
      verification_code,
      +bycryptConstants.salt,
    );
    await this._model.findOneAndUpdate(
      {
        [_body.mode]: _body.identifier.toLocaleLowerCase(),
      },
      { verification_code },
    );
    return {};
  }

  async resetPassword(_body: ResetPaswordDto): Promise<object> {
    const password = await bcrypt.hash(
      _body['password'],
      +bycryptConstants.salt,
    );
    const user = await this.findOneRecord(
      {
        reset_password_token: _body.reset_password_token,
      },
      ['reset_password_token'],
    );
    if (!user) throw new BadRequestException('Invalid Reset Password Token');
    await this._model.findOneAndUpdate(
      { reset_password_token: _body.reset_password_token },
      { password, reset_password_token: null },
    );
    return {};
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Change the password of a user.
   *
   * @param _body The request body with the old password and the new password.
   * @throws {UnauthorizedException} If the old password is not valid.
   * @throws {HttpException} If the new password is the same as the old password.
   * @returns An empty object.
   */
  /******  f3f589fb-e4fa-48d3-8d77-68e5f4e29f28  *******/
  async changePassword(_body: ChangePaswordDto): Promise<object> {
    const user = await this._model.findOne({ _id: this.userContext.get() });
    let verifyPassword = bcrypt.compareSync(
      _body['oldPassword'],
      user['password'],
    );
    if (!verifyPassword)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: ['The old password is not valid'],
        },
        HttpStatus.BAD_REQUEST,
      );
    verifyPassword = bcrypt.compareSync(_body['newPassword'], user['password']);
    if (verifyPassword)
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Validation Error',
          message: ['New Password Cannot Be The Same As The Old Password'],
        },
        HttpStatus.BAD_REQUEST,
      );
    const password = await bcrypt.hash(
      _body['newPassword'],
      +bycryptConstants.salt,
    );
    await this._model.findOneAndUpdate(
      { email: user['email'].toLocaleLowerCase() },
      { password },
    );
    return {};
  }

  async generateUserName(name: string): Promise<string> {
    let username = strSlug(name);
    let usernameExists = await this.verifyUser('username', username);
    while (usernameExists) {
      username = `${username}-${Math.floor(Math.random() * 1000)}`;
      usernameExists = await this.verifyUser('username', username);
    }
    return username;
  }

  async verifyUser(key: string, value?: string): Promise<boolean> {
    const record = await this.findOneRecord({ [key]: value });
    return record ? true : false;
  }
}
