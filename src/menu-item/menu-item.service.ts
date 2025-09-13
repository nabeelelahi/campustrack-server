import { name, schema } from './entities/menu-item.entity';
import { BaseService } from 'src/base/base.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { baseFindQueryType } from 'src/base/base.dto';

export class MenuItemService extends BaseService<
  typeof schema,
  CreateMenuItemDto
> {
  constructor(
    @InjectModel(name) override _model: Model<typeof schema>,
  ) {
    super();
  }

  public override _softDelete = () => true;

  public override _fillables = () => [
    'name',
    'price',
    'status',
    'slug',
    'created_at',
  ];

  protected override _beforeGetHook = async (
    _query: baseFindQueryType<typeof schema, CreateMenuItemDto>,
  ) => {
  };

}
