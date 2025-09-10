import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { schema, name } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserContext } from './user.context';
import { ClassModule } from 'src/class/class.module';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }]),ClassModule],
  controllers: [UserController],
  providers: [UserService, UserContext],
  exports: [UserService, UserContext],
})
export class UserModule {}
