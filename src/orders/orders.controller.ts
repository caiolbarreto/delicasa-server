import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':id')
  @HttpCode(201)
  async create(
    @Param('id') userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    console.log('user', userId, createOrderDto);

    return await this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  async findAll() {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  @Delete(':id')
  @HttpCode(203)
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(id);
  }
}
