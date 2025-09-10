import { name, schema } from './entities/class.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { UserContext } from 'src/user/user.context';
import { baseFindQueryType } from 'src/base/base.dto';

export class ClassService extends BaseService<
  typeof schema,
  CreateClassDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    private readonly userContext: UserContext,
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'name',
    'teacher',
    'students',
    'status',
    'slug',
    'created_at',
  ];

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, CreateClassDto>,
  ) => {
    const user = this.userContext.get()
  };

}
