FROM node:18

# Установка рабочего каталога
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь остальной код
COPY . .

# Компилируем TypeScript в JavaScript
RUN npm run build

# Указываем, что будет слушаться порт
EXPOSE 3750

# Запуск скомпилированного приложения
CMD ["node", "dist/main.js"]
