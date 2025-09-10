import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/notification.entity';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [NotificationController],
  providers: [NotificationService, UserContext],
})
export class NotificationModule { }
