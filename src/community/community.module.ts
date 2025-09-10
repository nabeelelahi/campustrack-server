import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/community.entity';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [CommunityController],
  providers: [CommunityService, UserContext],
  exports: [CommunityService],
})
export class CommunityModule {}
