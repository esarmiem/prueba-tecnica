# Tracker de Gastos Personales

Aplicación fullstack para gestionar gastos personales con React + TypeScript y Node.js + Express.

<img width="1833" height="711" alt="image" src="https://github.com/user-attachments/assets/dd6e9865-fa9c-4944-9919-f79f0319e5f1" />

## Funcionalidades principales

- Registro y listado de gastos
- Edición y eliminación de transacciones
- Resumen de gastos por categoría

## Uso en línea

Frontend desplegado en Vercel:

- https://prueba-tecnica-three-tan.vercel.app/

Backend desplegado en Render (health check):

- https://pruebatecnicabackend-bzi1.onrender.com/health
- Respuesta esperada: {"status":"ok"}

## Nota sobre disponibilidad del backend

El backend está en la capa gratuita de Render, por lo que puede entrar en suspensión. Al abrir el frontend, espera de 2 a 3 minutos para que el servicio despierte y la API responda correctamente.

## Requisitos

- Node.js 18+
- pnpm

## Backend (local)

```bash
cd ../pruebatecnicabackend
pnpm install
pnpm dev
```

Endpoints principales:

- GET http://localhost:3001/api/expenses
- POST http://localhost:3001/api/expenses
- PUT http://localhost:3001/api/expenses/:id
- DELETE http://localhost:3001/api/expenses/:id
- GET http://localhost:3001/health

## Frontend (local)

```bash
pnpm install
pnpm dev
```

## Variables de entorno

### Frontend

Archivo `.env.example`:

```
VITE_API_URL=http://localhost:3001
```

Archivo `.env.production`:

```
VITE_API_URL=https://your-render-service.onrender.com
```

En Vercel, definir:

```
VITE_API_URL=https://your-render-service.onrender.com
```

### Backend

Archivo `.env.example`:

```
PORT=3001
ALLOWED_ORIGIN=https://your-vercel-app.vercel.app
```

En Render, definir:

- NODE_ENV=production
- ALLOWED_ORIGIN=https://your-vercel-app.vercel.app

## Deploy

- Frontend (Vercel): https://prueba-tecnica-three-tan.vercel.app/
- Backend (Render): https://pruebatecnicabackend-bzi1.onrender.com
