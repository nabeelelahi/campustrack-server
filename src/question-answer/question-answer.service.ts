import { name, schema } from './entities/question-answer.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { baseFindQueryType } from 'src/base/base.dto';
import { UserContext } from 'src/user/user.context';

export class QuestionAnswerService extends BaseService<
  typeof schema,
  CreateQuestionAnswerDto
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
    'description',
    'user',
    'parent',
    'community',
    'status',
    'slug',
    'created_at',
  ];

  // @ts-expect-error @ts-ignore
  public override _beforeGetHook = (
    _query: baseFindQueryType<typeof schema, CreateQuestionAnswerDto>,
    condition: { [key: string]: any },
  ) => {
    if (!condition['parent']) condition['parent'] = null;
    _query.where(condition);
    _query.sort({ created_at: -1 });
    const user = this.userContext.get()
    if (user && user.role !== 'super-admin')
      _query.where({status: true})
  };

  protected override _beforeCreateHook = async (
    payload: Partial<CreateQuestionAnswerDto>,
  ) => {
    const { _id, role, name, address, email, mobile_no, username } =
      this.userContext.get();
    payload.user = {
      _id,
      role,
      name,
      address,
      email,
      mobile_no,
      username,
    };
    console.log('craete product payload', payload);
  };
}
