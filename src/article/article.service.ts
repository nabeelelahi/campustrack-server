import { name, schema } from './entities/article.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { baseConditionType, baseFindQueryType } from 'src/base/base.dto';
import { UserContext } from 'src/user/user.context';

export class ArticleService extends BaseService<
  typeof schema,
  CreateArticleDto
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
    'tag',
    'description',
    'title',
    'image_url',
    'status',
    'slug',
    'created_at',
  ];

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, CreateArticleDto>,
    condition: baseConditionType,
  ) => {
    const user = this.userContext.get()
    if (user && user.role !== 'super-admin')
      // @ts-ignore
      _query.where({status: true})
    console.log('condition...', user.role, condition)
  };
}
