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
import { PassportService } from './passport.service';
import { CreatePassportDto } from './dto/create-passport.dto';
import { UpdatePassportDto } from './dto/update-passport.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BulkDeleteDto } from 'src/base/base.dto';

@Controller('api/passport')
@ApiBearerAuth('Authorization')
export class PassportController {
  constructor(private readonly _service: PassportService) {}

  @Post()
  create(@Body() _body: CreatePassportDto) {
    return this._service.create(_body);
  }

  @Get()
  findAll(@Query() _query: object) {
    return this._service.findAll(_query);
  }

  @Get('achievement')
  achievement() {
    return this._service.achievement();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() _body: UpdatePassportDto) {
    return this._service.update(id, _body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() _body: BulkDeleteDto) {
    return this._service.remove(id, _body);
  }
}
