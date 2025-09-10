import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BulkDeleteDto } from 'src/base/base.dto';

@Controller('api/question-answer')
@ApiBearerAuth('Authorization')
export class QuestionAnswerController {
  constructor(private readonly _service: QuestionAnswerService) {}

  @Post()
  create(@Body() _body: CreateQuestionAnswerDto) {
    return this._service.create(_body);
  }

  @Get()
  findAll(@Query() _query: object) {
    return this._service.findAll(_query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() _body: UpdateQuestionAnswerDto) {
    return this._service.update(id, _body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() _body: BulkDeleteDto) {
    return this._service.remove(id, _body);
  }
}
