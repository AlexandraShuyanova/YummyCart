# YummyCart — Fullstack Food Delivery App

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)

YummyCart is a fullstack food delivery application that simulates a real-world ordering system: authentication, categories, search, server-synchronized cart and order processing.

The project focuses on a scalable frontend architecture, predictable state management and clean client–server interaction.

**Live demo:** https://yummy-cart-eta.vercel.app

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API](#api)
- [Architecture](#architecture)
- [Roadmap](#roadmap)

## Features

- JWT authentication (register / login, protected routes)
- Product categories
- Search with highlighting (by name and ingredients)
- Pagination (server-side endpoint available)
- Product page
- Cart with full CRUD (add / remove / update quantity)
- Cart synchronized per user on the server
- Order flow with a success screen; cart is cleared after ordering
- Responsive layout for mobile and desktop

## Tech Stack

| Layer    | Technologies |
|----------|--------------|
| Frontend | React 19, TypeScript, Redux Toolkit, React Router 7, Axios, Vite, CSS Modules |
| Backend  | Node.js, Express 5, Prisma ORM, JWT, bcrypt |
| Database | PostgreSQL 17 |
| DevOps   | Docker, Docker Compose, Vercel (frontend), Railway (backend) |

## Demo

### Authentication

JWT is stored in localStorage and used for protected API requests.

![auth](https://github.com/user-attachments/assets/3fac10ff-2090-45d7-a3af-88da108bcfbf)

### Menu & Search

Search, filtering and pagination.

![Menu](https://github.com/user-attachments/assets/26eec124-9041-4518-bfba-0520e72ac80e)

### Cart Management

Add/remove items, update quantity and calculate total price.
Cart is synchronized with backend per user.

![Cart](https://github.com/user-attachments/assets/7c649e62-3b2b-46ed-88e9-5792b2ea70d8)

### Order Flow

Order placement and success screen.

<img width="1396" height="928" alt="order_new (1)" src="https://github.com/user-attachments/assets/90cf35fc-4d0d-4dd9-96e3-f9cde4713217" />

---

### Screenshots
### Mobile 

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/6aae5a42-989d-4306-826a-cdd42f2166a5" alt="Menu"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="250" src="https://github.com/user-attachments/assets/2cb0d0a0-1c0d-4a5d-8b97-9b924c1633f9" alt="Product"/>
</p>

<p align="center">
  <b>Menu</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Product Page</b>
</p>

<br>

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/c78b4d8f-503f-470d-bb6f-07ab3ad1b2ad" alt="Search & Highlight"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="250" src="https://github.com/user-attachments/assets/6dc3b67c-3832-495b-aab6-3b254ce24aa4" alt="Empty Cart"/>
</p>

<p align="center">
  <b>Search & Highlight</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Empty Cart</b>
</p>

<br>

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/cfc735bb-19da-4e20-a16f-8e7b53148b11" alt="Cart"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="250" src="https://github.com/user-attachments/assets/2b951d08-3b8d-4846-95b1-02f94621f088" alt="Order Success"/>
</p>

<p align="center">
  <b>Cart</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Order Success</b>
</p>

<br>

<p align="center">
  <img width="250" alt="Register" src="https://github.com/user-attachments/assets/797d643f-f06c-4e24-9a85-39853005d278" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img width="250" alt="Login" src="https://github.com/user-attachments/assets/8139eeb8-9832-4595-8cf3-8be1e76f8db4" />
</p>

<p align="center">
  <b>Sign Up</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>Login</b>
</p>

## Getting Started

### Requirements

- Node.js 20+
- Docker and Docker Compose (for the easiest setup) or a local PostgreSQL instance

### Run with Docker

```bash
git clone https://github.com/AlexandraShuyanova/YummyCart.git
cd YummyCart
docker-compose -f docker-compose.dev.yml up --build
```

| Service    | URL                     |
|------------|-------------------------|
| Frontend   | http://localhost:5173   |
| Backend    | http://localhost:3001   |
| PostgreSQL | localhost:5432 (`postgres` / `postgres`, db `pizza_db`) |

### Run locally (without Docker)

**Backend**

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pizza_db"
```

```bash
npx prisma migrate deploy   # apply migrations
npx prisma generate
npm run dev                 # http://localhost:3001
```

**Frontend**

```bash
cd frontend
npm install
npm run dev                 # http://localhost:5173
```

In production the frontend reads the API address from `VITE_API_URL` (see `frontend/.env.production`).

### Seed data

SQL dumps of products and categories live in [`backups/`](./backups) (`Product.sql`, `Category.sql`, `CategoryToProduct.sql`) and can be imported into PostgreSQL.

### Frontend scripts

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Type-check and build     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Project Structure

```
YummyCart
├── backend
│   ├── prisma/          # schema.prisma and migrations
│   └── src/server.ts    # Express API
├── frontend
│   └── src
│       ├── components/  # reusable UI components
│       ├── pages/       # Menu, Product, Cart, Login, Register, Success, Error
│       ├── layout/      # shared layouts (main, auth)
│       ├── store/       # Redux Toolkit slices (user, cart)
│       ├── interfaces/  # TypeScript types
│       ├── helpers/     # API config, RequireAuth
│       └── assets/      # static files
├── backups/             # SQL data dumps
├── docker-compose.dev.yml
└── docker-compose.prod.yml
```

## API

All routes are prefixed with `/pizza-api`.

| Method | Endpoint           | Auth | Description                    |
|--------|--------------------|:----:|--------------------------------|
| POST   | `/auth/register`   |      | Register a new user            |
| POST   | `/auth/login`      |      | Log in, returns JWT            |
| GET    | `/user/profile`    | Yes  | Current user profile           |
| GET    | `/products`        |      | List all products              |
| GET    | `/products-paged`  |      | Paginated products             |
| GET    | `/products/:id`    |      | Single product                 |
| GET    | `/categories`      |      | List categories                |
| GET    | `/categories/:id`  |      | Category details               |
| GET    | `/cart`            | Yes  | Get the user's cart            |
| POST   | `/cart/update`     | Yes  | Update the user's cart         |
| POST   | `/order`           | Yes  | Place an order                 |

Protected routes expect an `Authorization: Bearer <token>` header.

## Architecture

### State management (Redux Toolkit)

- **user slice** — JWT token, user profile, login/register errors
- **cart slice** — server-synchronized cart items; async thunks for add / remove / update / clear

### Data flow

1. User triggers an action (e.g. add to cart)
2. A Redux async thunk sends a request to the API
3. The backend updates the cart linked to `userId`
4. The updated data is returned and stored in Redux
5. The UI re-renders from the new state

### Authentication

- JWT issued on login/register; stored in Redux and persisted in `localStorage`
- Sent in the `Authorization` header for protected requests
- Passwords are hashed with bcrypt; JWT middleware guards protected routes

### Data model

`User`, `Product`, `Category`, `Cart`, `CartItem`, `Order`, `OrderItem` (see [`schema.prisma`](./backend/prisma/schema.prisma)).

## Roadmap

- [ ] Use server-side pagination in the UI
- [ ] Advanced filtering & sorting
- [ ] Debounced search
- [ ] Loading skeletons
- [ ] Product reviews
- [ ] Admin panel
