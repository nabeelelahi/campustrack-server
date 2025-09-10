import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UseInterceptors,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdateUserDto } from './dto/user.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ForgotDto } from './dto/forgot.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AccessTokenInterceptor } from '../access-token/access-token.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConstants } from 'config/constants';
import { ResetPaswordDto } from './dto/set-password.dto';
import { ChangePaswordDto } from './dto/change-password.dto';

@ApiTags('Authentication / Profile Management')
@ApiBearerAuth('Authorization')
@Controller('api/user')
export class UserController {
  constructor(protected _service: UserService) {}

  @Post()
  create(@Body() _body: UserDto) {
    return this._service.create(_body);
  }

  @Get()
  findAll(@Query() _query: object) {
    return this._service.findAll(_query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._service.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', { storage: storageConstants.multer.storage }),
  )
  update(@Param('id') id: string, @Body() _body: UpdateUserDto) {
    return this._service.update(id, _body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._service.remove(id);
  }

  @UseInterceptors(AccessTokenInterceptor)
  @Post('/login')
  async login(@Body() _body: LoginDto): Promise<any> {
    return await this._service.login(_body);
  }

  @Post('/verify-code')
  //  have to create resetpassword token interceptor.
  async verifyCode(@Body() _body: VerifyCodeDto) {
    return await this._service.verifyCode(_body);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() _body: ForgotDto) {
    return await this._service.forgotPassword(_body);
  }

  @Post('/resend-code')
  async resendCode(@Body() _body: ForgotDto) {
    return await this._service.resetVerificationCode(_body);
  }

  @Post('/reset-password')
  async resetPassword(@Body() _body: ResetPaswordDto) {
    return await this._service.resetPassword(_body);
  }

  @Post('/change-password')
  async changePassword(@Body() _body: ChangePaswordDto) {
    return await this._service.changePassword(_body);
  }
}
