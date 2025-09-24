import { name, schema } from './entities/attendance.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UserContext } from 'src/user/user.context';
import { baseConditionType, baseFindOneQueryType, baseFindQueryType } from 'src/base/base.dto';

export class AttendaceService extends BaseService<
  typeof schema,
  CreateAttendanceDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    private readonly userContext: UserContext,
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'student',
    'class',
    'action',
    'status',
    'slug',
    'created_at',
  ];

  protected override  _populateRelations = (
    _query: baseFindOneQueryType<typeof schema, CreateAttendanceDto>,
  ) => {
    _query.populate('class')
  };

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, CreateAttendanceDto>,
    condition: baseConditionType,
  ) => {
    if (condition) {
      console.log(condition)
      _query.where(condition);
    }
  };

  public override _beforeCreateHook = async (
    payload: CreateAttendanceDto,
  ) => {
    payload.student = this.userContext.get()._id;
  };

}
