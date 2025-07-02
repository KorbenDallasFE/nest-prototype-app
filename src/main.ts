import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Получаем ConfigService для чтения переменных окружения
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3750;

  // Регистрируем LoggingInterceptor глобально
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,              // удаляет лишние поля из тела запроса
        forbidNonWhitelisted: true,   // выбрасывает ошибку при наличии лишних полей
        transform: true,              // преобразует типы DTO (например, строки в числа)
      }),
  );

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
