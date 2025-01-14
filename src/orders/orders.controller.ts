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
  Put,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':id')
  @HttpCode(201)
  async create(
    @Param('id') userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('cpf') cpf?: string,
    @Query('status') status?: string,
    @Query('page') page?: string,
  ) {
    const pageIndex = page ? parseInt(page, 10) : 1;

    return await this.ordersService.findAll(name, cpf, status, pageIndex);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const order = await this.ordersService.findOne(id);

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  @Put(':id')
  @HttpCode(203)
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    await this.ordersService.update(id, updateOrderDto.status);
  }

  @Delete(':id')
  @HttpCode(203)
  async remove(@Param('id') id: string) {
    await this.ordersService.remove(id);
  }
}
