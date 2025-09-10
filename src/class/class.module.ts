import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { name, schema } from './entities/class.entity';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
    controllers: [ClassController],
    providers: [ClassService, UserContext],
    exports: [ClassService],
})
export class ClassModule {}
