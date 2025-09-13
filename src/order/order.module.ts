import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/order.entity';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
    controllers: [OrderController],
    providers: [OrderService, UserContext],
    exports: [OrderService],
})
export class OrderModule {}
