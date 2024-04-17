import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UsersModule,
    ItemsModule,
    OrdersModule,
    UploadModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
