# 🌐 CoFoundly Frontend

![Next.JS](https://img.shields.io/badge/NextJS-v15-black)
![React](https://img.shields.io/badge/React-v19-blue)

Frontend-репозиторий для сервиса **CoFoundly**, реализованный на основе **Next.js 15**, с использованием **React 19**, **TailwindCSS 4** и **TypeScript**

Production-версия доступна по адресу: https://co-foundly.ru

Backend-репозиторий: https://github.com/Ximeo-dev/CoFoundlyBackend.git

## 🧰 Стек технологий

- **Next.js 15** — современный React-фреймворк с SSR, App Router и Server Actions  
- **React 19** — последняя версия React с поддержкой Server Components  
- **TypeScript** — строгая типизация и улучшенная разработка  
- **TailwindCSS 4** — утилитарный CSS-фреймворк
- **Zustand + Jotai** — управление состоянием  
- **React Hook Form + Zod** — формы с типобезопасной валидацией  
- **TanStack React Query** — работа с API и кеширование  
- **Radix UI** — доступные и кастомизируемые UI-компоненты  
- **Framer Motion** — анимации и переходы  
- **Socket.IO** — real-time взаимодействие (чаты, уведомления и т.п.)  
- **Lucide-react + React-icons** — набор современных иконок  
- **CSS + PostCSS** — гибкие стили и препроцессинг  
- **Day.js / date-fns** — работа с датами и временем  

## 📁 Структура проекта

```bash
src/
├── api/          # Интерсепторы для работы с backend API
├── app/          # Next.js App Router (pages, layout, routing)
├── components/   # Переиспользуемые UI-компоненты
├── config/       # Конфигурации и настройки
├── constants/    # Константы
├── hooks/        # Кастомные React-хуки
├── lib/          # Библиотеки, вспомогательные функции
├── providers/    # Провайдеры (тема, состояние, сессия и т.д.)
├── services/     # Сервисы для бизнес-логики и API-запросов
├── store/        # Zustand / Jotai состояние
├── types/        # TypeScript-типы
├── utils/        # Утилиты
└── zod/          # Схемы Zod для валидации
```

## 🛠️ Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/Ximeo-dev/CoFoundlyWebsite.git
cd CoFoundlyWebsite

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Билд проекта
npm run build

# Предпросмотр продакшн-сборки
npm run start
```
