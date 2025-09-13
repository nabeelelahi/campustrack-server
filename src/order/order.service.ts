import { name, schema } from './entities/order.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserContext } from 'src/user/user.context';
import { baseFindQueryType } from 'src/base/base.dto';

export class OrderService extends BaseService<
  typeof schema,
  CreateOrderDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
    private readonly userContext: UserContext,
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'staff_member',
    'student',
    'items',
    'price',
    'status',
    'slug',
    'created_at',
  ];

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, CreateOrderDto>,
  ) => {
    _query.populate('items')
    _query.populate('student')
    // const user = this.userContext.get()
  };

    public override _beforeCreateHook = async (
      payload: CreateOrderDto,
    ) => {
      payload.staff_member = this.userContext.get()._id;
    };

}
