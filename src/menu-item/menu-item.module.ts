import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { name, schema } from './entities/menu-item.entity';
import { MenuItemController } from './menu-item.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
    controllers: [MenuItemController],
    providers: [MenuItemService],
    exports: [MenuItemService],
})
export class MenuItemModule {}
