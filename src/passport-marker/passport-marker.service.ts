import { name, schema } from './entities/passport-marker.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePassportMarkerDto } from './dto/create-passport-marker.dto';
import { UserContext } from 'src/user/user.context';

export class PassportMarkerService extends BaseService<
  typeof schema,
  CreatePassportMarkerDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    private readonly userContext: UserContext,
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'passport',
    'user',
    'status',
    'slug',
    'status',
    'created_at',
  ];

  public override _beforeCreateHook = async (
    payload: CreatePassportMarkerDto,
  ) => {
    payload.user = this.userContext.get()._id;
  };

  public async removeRecord(payload: CreatePassportMarkerDto) {
    return await this._model.deleteMany({
      user: this.userContext.get()._id,
      passport: payload.passport,
    });
  }
}
