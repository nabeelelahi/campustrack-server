import { Module } from '@nestjs/common';
import { AttendaceService } from './attendance.service';
import { name, schema } from './entities/attendance.entity';
import { AttendanceController } from './attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
    controllers: [AttendanceController],
    providers: [AttendaceService, UserContext],
    exports: [AttendaceService],
})
export class AttendanceModule {}
