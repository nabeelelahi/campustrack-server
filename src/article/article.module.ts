import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/article.entity';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [ArticleController],
  providers: [ArticleService, UserContext],
  exports: [ArticleService],
})
export class ArticleModule {}
