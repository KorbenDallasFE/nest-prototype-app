import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import { logger } from './common/logger';

logger.info('🚀 Server startup — Observability enabled');

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule, {
        logger: false, // отключаем встроенный Nest-логгер
    });

    logger.info('🚀 Initializing application');

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
  app.useGlobalFilters(new HttpErrorFilter());

    await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
