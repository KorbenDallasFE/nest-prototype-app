# NestJS Prototype App

![CI](https://github.com/KorbenDallasFE/nest-prototype-app/actions/workflows/ci.yml/badge.svg)
![Docker Pulls](https://img.shields.io/docker/pulls/tbgp/nest-prototype-app?color=brightgreen)
![License](https://img.shields.io/github/license/KorbenDallasFE/nest-prototype-app)

## 📖 Описание

Этот проект — концепт **NestJS**‑сервиса с CRUD‑ресурсом `products`, встроенными средствами **Observability** (Pino‑логи + Prometheus‑метрики) и возможностью упаковки в Docker.

Технологии и архитектура проекта:
```bash
NestJS: модули, контроллеры, сервисы, DI, декораторы

HTTP‑поток: Guard → Interceptor → Pipe → Controller → ExceptionFilter

12‑factor app: ConfigModule, .env, process.env

Docker: .dockerignore, Dockerfile‑контракт, EXPOSE vs -p

Observability: Pino‑логгер, Prometheus‑метрики

Приложение будет доступно на http://localhost:3750

Swagger‑документация: http://localhost:3750/api

Prometheus‑метрики: http://localhost:3750/metrics
```
---

## 🚀 Быстрый старт

### Локальный запуск
```
git clone https://github.com/KorbenDallasFE/nest-prototype-app.git
cd nest‑prototype‑app
npm install
cp .env.example .env
npm run start:dev
```

### Запуск в Docker
```
docker build -t my‑app .
docker run -d -p 4000:3750 my‑app
```

### Конфигурация
```
Для работы проекта нужно настроить переменные окружения. 
Для этого скопировать шаблон и указать значения:
cp .env.example .env
```

Пример содержимого .env.example:
```
PORT=3750 
```
Порт запуска приложения в переменной PORT (3750 по умолчанию)

Endpoints:
```
GET    /		(Hello World)
GET    /products	(Auth token)
POST   /products	(DTO validation)
GET    /metrics	        (Prometheus)
GET    /api		(Swagger docs)
```

CI: GitHub Actions
Проект использует CI‑пайплайн на GitHub Actions для автоматической проверки кода:
```
 Устанавливает зависимости (npm ci)

 Прогоняет юнит‑тесты (npm run test)

 Собирает проект (npm run build)

 Строит Docker‑образ (опционально, для проверки сборки)
```
Файл workflow: 
```
.github/workflows/ci.yml
```
CI запускается при каждом push и pull request в ветку main.

```
KorbenDallasFE
```

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

