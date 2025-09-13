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
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BulkDeleteDto } from 'src/base/base.dto';

@Controller('api/menu-item')
@ApiBearerAuth('Authorization')
export class MenuItemController {
  constructor(private readonly _service: MenuItemService) {}

  @Post()
  create(@Body() _body: CreateMenuItemDto) {
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
  update(@Param('id') id: string, @Body() _body: UpdateMenuItemDto) {
    return this._service.update(id, _body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() _body: BulkDeleteDto) {
    return this._service.remove(id, _body);
  }
}
