# 🍔 YummyCart — Fullstack Food Delivery Application

YummyCart is a fullstack food delivery application designed to simulate a real-world ordering system with authentication, cart synchronization, and order processing.

The project focuses on scalable frontend architecture, predictable state management, and clean client-server interaction.

---

## 🌐 Live Demo

Frontend: https://yummy-cart-eta.vercel.app  
Backend API: https://yummycart-production.up.railway.app/pizza-api/

---

## 🚀 Tech Stack

- React + TypeScript
- Redux Toolkit (global state)
- React Router (createBrowserRouter)
- Vite (build tool)
- Axios (API requests)
- Node.js + Express
- JWT authentication
- Docker

---

## ✨ Features

- 🔐 Authentication (JWT)
- 🔍 Search with highlight (name & ingredients)
- 📄 Product page
- 🛒 Cart with full CRUD (add / remove / update)
- 🔄 Cart sync per user (server-side)
- 📦 Order flow with success screen
- 🧹 Cart is cleared after order
- 📄 Pagination

---

## 📸 Screenshots

### 🍕 Menu

<p align="center">
  <img width="800" src="https://github.com/user-attachments/assets/4af45b20-9e5c-4a67-9510-72dc61b93dbd" />
</p>

---

### 🔍 Search & Highlight

Highlights matched text in product names and ingredients.

<p align="center">
<img width="800" src="https://github.com/user-attachments/assets/bf96c160-bbc1-465e-bb28-7936cc3e77e1"/> 
</p>

---

### 📄 Product

<p align="center">
<img width="800" src="https://github.com/user-attachments/assets/3dbfe10b-1304-446a-85ef-12a4d5f67d85"/> 
</p>

---

### 🛒 Cart

<p align="center">
<img width="800" src="https://github.com/user-attachments/assets/a0d66a80-2b49-41a9-a612-9016729b48f1"/> 
</p>

---

### ✅ Order Success

<p align="center">
<img width="800" src="https://github.com/user-attachments/assets/557f400a-697c-4565-a5bd-d68be5556266"/> 
</p>

---

## 🎥 Demo

### 🔐 Authentication

JWT is stored in localStorage and used for protected API requests.

![auth](https://github.com/user-attachments/assets/3fac10ff-2090-45d7-a3af-88da108bcfbf)

### 🍕 Menu & Search

Search, filtering and pagination.

![Menu](https://github.com/user-attachments/assets/26eec124-9041-4518-bfba-0520e72ac80e)

### 🛒 Cart Management

Add/remove items, update quantity and calculate total price.
Cart is synchronized with backend per user.

![Cart](https://github.com/user-attachments/assets/7c649e62-3b2b-46ed-88e9-5792b2ea70d8)

### ✅ Order Flow

Order placement and success screen.

![Order](https://github.com/user-attachments/assets/be3d122b-e3df-4c01-b597-4239edf460ab)

---

## 🧠 State Management (Redux)

Global state is managed with Redux Toolkit and split into two slices:

### 👤 user slice
- JWT token (authentication state)
- user profile (fetched from backend)
- login / register error handling

### 🛒 cart slice
- cart items (server-synchronized)
- async updates via API (add / remove / update / clear)
- cart is persisted per user on backend

---

## 🔄 Data Flow

1. User triggers action (e.g. add to cart)
2. Redux async thunk sends request to API
3. Backend updates cart linked to userId
4. Updated data is returned and stored in Redux
5. UI re-renders based on new state

---

## 🔐 Authentication

- JWT-based authentication
- Token is stored in Redux and persisted in localStorage
- Used in Authorization header for protected requests

---

## ⚙️ Backend

- REST API built with Express.js
- JWT middleware for protected routes
- bcrypt for password hashing
- In-memory storage (mock database)

---

## ⚠️ Notes

- Data is stored in-memory (no persistent database)
- Data resets on server restart (free tier limitation)
- Can be extended with PostgreSQL or MongoDB

---

## 🐳 Docker

```bash
docker-compose up --build

## 📌 Future Improvements

- Add persistent database (PostgreSQL / MongoDB)
- Improve validation (frontend + backend)
- Add debounce for search
- Add loading skeletons
