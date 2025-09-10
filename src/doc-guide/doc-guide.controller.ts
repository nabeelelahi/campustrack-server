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
import { DocGuideService } from './doc-guide.service';
import { CreateDocGuideDto } from './dto/create-doc-guide.dto';
import { UpdateDocGuideDto } from './dto/update-doc-guide.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BulkDeleteDto } from 'src/base/base.dto';

@Controller('api/doc-guide')
@ApiBearerAuth('Authorization')
export class DocGuideController {
  constructor(private readonly _service: DocGuideService) {}

  @Post()
  create(@Body() _body: CreateDocGuideDto) {
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
  update(@Param('id') id: string, @Body() _body: UpdateDocGuideDto) {
    return this._service.update(id, _body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() _body: BulkDeleteDto) {
    return this._service.remove(id, _body);
  }
}
