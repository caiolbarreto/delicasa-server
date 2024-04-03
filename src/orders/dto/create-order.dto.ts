import { IsNotEmpty } from 'class-validator';

interface ItemsDetailsBody {
  id: string;
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  itemsDetails: ItemsDetailsBody[];
}
