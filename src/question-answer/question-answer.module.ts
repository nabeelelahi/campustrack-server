import { Module } from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswerController } from './question-answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { name, schema } from './entities/question-answer.entity';
import { UserContext } from 'src/user/user.context';

@Module({
  imports: [MongooseModule.forFeature([{ name, schema }])],
  controllers: [QuestionAnswerController],
  providers: [QuestionAnswerService, UserContext],
})
export class QuestionAnswerModule {}
