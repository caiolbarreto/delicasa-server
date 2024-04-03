import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const orderOnDatabase = await this.prisma.order.create({
      data: {
        userId,
      },
    });

    await Promise.all(
      createOrderDto.itemsDetails.map(async (item) => {
        await this.prisma.orderItem.create({
          data: {
            orderId: orderOnDatabase.id,
            itemId: item.id,
            quantity: item.quantity,
          },
        });
      }),
    );
  }

  async findAll() {
    return await this.prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.order.findUnique({ where: { id } });
  }

  async update(id: string, status: string) {
    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    await this.prisma.order.delete({ where: { id } });
  }
}
