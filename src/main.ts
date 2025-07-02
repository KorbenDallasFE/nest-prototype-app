import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { HttpErrorFilter } from './common/filters/http-error.filter';
import { logger } from './common/logger';

// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

logger.info('🚀 Server startup — Observability enabled');

async function bootstrap() {
    const app: INestApplication = await NestFactory.create(AppModule, {
        logger: false, // отключаем встроенный Nest-логгер
    });

    logger.info('🚀 Initializing application');

    // Настройка Swagger
    const swaggerConfig = new DocumentBuilder()
        .setTitle('NestJS Prototype API')
        .setDescription('CRUD endpoints with Observability & Docker setup')
        .setVersion('1.0')
        .build();
    const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDoc);
    logger.info('📚 Swagger UI available at /api');

    // Получаем ConfigService для чтения переменных окружения
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3750;

    // Регистрируем глобальные перехватчики, пайпы и фильтры
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,            // удаляет лишние поля
            forbidNonWhitelisted: true, // ошибка при наличии лишних полей
            transform: true,            // преобразует типы DTO
        }),
    );
    app.useGlobalFilters(new HttpErrorFilter());

    // Запуск сервера на всех интерфейсах
    await app.listen(port, '0.0.0.0');
    logger.info(`✅ Application is running on http://localhost:${port}`);
    logger.info(`📊 Metrics available at http://localhost:${port}/metrics`);
}

bootstrap();
