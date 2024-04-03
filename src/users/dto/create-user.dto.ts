import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cellphone: string;

  @IsOptional()
  isAdmin: boolean;
}
