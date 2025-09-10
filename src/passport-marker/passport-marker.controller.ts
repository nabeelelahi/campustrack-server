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
import { PassportMarkerService } from './passport-marker.service';
import { CreatePassportMarkerDto } from './dto/create-passport-marker.dto';
import { UpdatePassportMarkerDto } from './dto/update-passport-marker.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BulkDeleteDto } from 'src/base/base.dto';

@Controller('api/passport-marker')
@ApiBearerAuth('Authorization')
export class PassportMarkerController {
  constructor(private readonly _service: PassportMarkerService) {}

  @Post()
  create(@Body() _body: CreatePassportMarkerDto) {
    return this._service.create(_body);
  }

  @Delete()
  remove(@Body() _body: CreatePassportMarkerDto) {
    return this._service.removeRecord(_body);
  }
}
