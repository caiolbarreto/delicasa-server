import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll() {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const item = await this.itemsService.findOne(id);

    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }

    return item;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.findOne(id);

    await this.itemsService.remove(id);
  }
}
