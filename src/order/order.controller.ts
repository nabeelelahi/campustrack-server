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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BulkDeleteDto } from 'src/base/base.dto';

@Controller('api/order')
@ApiBearerAuth('Authorization')
export class OrderController {
  constructor(private readonly _service: OrderService) {}

  @Post()
  create(@Body() _body: CreateOrderDto) {
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
  update(@Param('id') id: string, @Body() _body: UpdateOrderDto) {
    return this._service.update(id, _body);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() _body: BulkDeleteDto) {
    return this._service.remove(id, _body);
  }
}
