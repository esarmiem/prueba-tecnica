# Prueba Técnica — Tracker de Gastos

Aplicación fullstack para gestionar gastos personales con React + TypeScript y Node.js + Express. El frontend consume una API REST y usa localStorage como fallback cuando la API no está disponible.

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

- Frontend (Vercel): https://your-vercel-app.vercel.app

## Screenshots

![Listado de gastos](./screenshots/listado-gastos.png)
![Formulario de gasto](./screenshots/formulario-gasto.png)
![Filtros y resumen](./screenshots/filtros-resumen.png)
