import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // добавили импорт
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // подключаем ConfigModule глобально
    UsersModule, TasksModule, ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
