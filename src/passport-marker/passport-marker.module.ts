import { Module } from '@nestjs/common';
import { PassportMarkerService } from './passport-marker.service';
import { PassportMarkerController } from './passport-marker.controller';
import { UserContext } from 'src/user/user.context';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/passport-marker.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [PassportMarkerController],
  providers: [PassportMarkerService, UserContext],
  exports: [PassportMarkerService],
})
export class PassportMarkerModule {}
