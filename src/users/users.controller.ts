import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByCpf(createUserDto.cpf);

    if (user) {
      throw new HttpException('CPF already taken', HttpStatus.BAD_REQUEST);
    }

    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Patch(':id')
  @HttpCode(203)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(203)
  async remove(@Param('id') id: string) {
    await this.findOne(id);

    await this.usersService.remove(id);
  }
}
