import { name, schema } from './entities/doc-guide.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDocGuideDto } from './dto/create-doc-guide.dto';
import { baseConditionType, baseFindQueryType } from 'src/base/base.dto';
import { UserContext } from 'src/user/user.context';

export class DocGuideService extends BaseService<
  typeof schema,
  CreateDocGuideDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    private readonly userContext: UserContext,
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'title',
    'sub_title',
    'file_url',
    'status',
    'slug',
    'created_at',
  ];

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, CreateDocGuideDto>,
    condition: baseConditionType,
  ) => {
    const user = this.userContext.get()
    if (user && user.role !== 'super-admin')
      // @ts-ignore
      _query.where({status: true})
  };

}
