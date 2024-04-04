import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

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

  async findAll(
    name?: string,
    cpf?: string,
    status?: string,
    pageIndex?: number,
  ) {
    const perPage = 10; // Number of items per page
    const skip = pageIndex ? (pageIndex - 1) * perPage : 0; // Calculate skip based on pageIndex

    const where: any = {}; // Initialize where clause

    // Add filters based on provided parameters
    if (status && status !== 'all') {
      where.status = status;
    }

    if (name) {
      where.user = { name: { contains: name } };
    }

    if (cpf) {
      where.user = { ...where.user, cpf: { contains: cpf } };
    }

    const orders = await this.prisma.order.findMany({
      where,
      include: {
        items: {
          include: {
            item: true,
          },
        },
        user: true,
      },
      take: perPage,
      skip,
    });

    const totalCount = await this.prisma.order.count({ where });

    const meta = {
      totalCount,
      pageIndex,
      perPage,
    };

    return { orders, meta };
  }

  async findOne(id: string) {
    return await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
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
