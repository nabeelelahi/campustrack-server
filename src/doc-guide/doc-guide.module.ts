import { Module } from '@nestjs/common';
import { DocGuideService } from './doc-guide.service';
import { DocGuideController } from './doc-guide.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/doc-guide.entity';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [DocGuideController],
  providers: [DocGuideService, UserContext],
  exports: [DocGuideService],
})
export class DocGuideModule {}
