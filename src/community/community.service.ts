import { name, schema } from './entities/community.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UserContext } from 'src/user/user.context';
import { baseConditionType, baseFindQueryType } from 'src/base/base.dto';

export class CommunityService extends BaseService<
  typeof schema,
  CreateCommunityDto
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
    'image_url',
    'status',
    'slug',
    'created_at',
  ];

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, CreateCommunityDto>,
    condition: baseConditionType,
  ) => {
    const user = this.userContext.get()
    if (user && user.role !== 'super-admin')
      // @ts-ignore
      _query.where({status: true})
  };

}
