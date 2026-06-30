
# 🍔 YummyCart — Fullstack Food Delivery Application

YummyCart is a fullstack food delivery application designed to simulate a real-world ordering system with authentication, cart synchronization, and order processing.

The project focuses on scalable frontend architecture, predictable state management, and clean client-server interaction.

---

## 🌐 Live Demo

Live Demo: https://yummy-cart-eta.vercel.app  

---

## 🚀 Tech Stack

- React + TypeScript
- Redux Toolkit (global state)
- React Router (createBrowserRouter)
- Vite
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT authentication
- Docker

---

## 🧱 Frontend Architecture

The frontend is structured with clear separation of concerns to keep the code scalable and maintainable:

- **components/** – reusable UI components  
- **pages/** – main application pages (Menu, Product, Cart, Auth)  
- **layouts/** – shared layouts  
- **store/** – global state (Redux Toolkit: user, cart)  
- **interfaces/** – TypeScript types  
- **helpers/** – utilities and shared logic  
- **assets/** – static files  

The architecture supports both mobile and desktop layouts without duplicating logic.

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
### 📱 Mobile 

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/6aae5a42-989d-4306-826a-cdd42f2166a5" alt="Menu"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="250" src="https://github.com/user-attachments/assets/2cb0d0a0-1c0d-4a5d-8b97-9b924c1633f9" alt="Product"/>
</p>

<p align="center">
  <b>1. Menu</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>2. Product's page</b>
</p>

<br>

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/c78b4d8f-503f-470d-bb6f-07ab3ad1b2ad" alt="Search & Highlight"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="250" src="https://github.com/user-attachments/assets/6dc3b67c-3832-495b-aab6-3b254ce24aa4" alt="Empty Cart"/>
</p>

<p align="center">
  <b>3. Search & Highlight</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>4. Empty Cart</b>
</p>

<br>

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/cfc735bb-19da-4e20-a16f-8e7b53148b11" alt="Cart"/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img width="250" src="https://github.com/user-attachments/assets/2b951d08-3b8d-4846-95b1-02f94621f088" alt="Order Success"/>
</p>

<p align="center">
  <b>5. Cart</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>6. Order Success</b>
</p>

<br>

<p align="center">
  <img width="250" alt="Register" src="https://github.com/user-attachments/assets/797d643f-f06c-4e24-9a85-39853005d278" />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img width="250" alt="Login" src="https://github.com/user-attachments/assets/8139eeb8-9832-4595-8cf3-8be1e76f8db4" />
</p>

<p align="center">
  <b>7. Sign Up</b>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <b>8. Login</b>
</p>


### 💻 Desktop

### 🍕 Menu

<p align="center">
  <img width="800" src="https://github.com/user-attachments/assets/4af45b20-9e5c-4a67-9510-72dc61b93dbd" />
</p>

---

### 📄 Product

<p align="center">
<img width="800" src="https://github.com/user-attachments/assets/3dbfe10b-1304-446a-85ef-12a4d5f67d85"/> 
</p>

---

### 🔍 Search & Highlight

<p align="center">
<img width="800" src="https://github.com/user-attachments/assets/bf96c160-bbc1-465e-bb28-7936cc3e77e1"/> 
</p>

---



### 🛒 Cart

<p align="center">
<img width="800" src="https://github.com/user-attachments/assets/a0d66a80-2b49-41a9-a612-9016729b48f1"/> 
</p>

---

### ✅ Order Success

<p align="center">
<img width="800" alt="order_desctop" src="https://github.com/user-attachments/assets/17957b1d-4843-4d08-9ece-4bf33de38e66" />
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

<img width="1396" height="928" alt="order_new (1)" src="https://github.com/user-attachments/assets/90cf35fc-4d0d-4dd9-96e3-f9cde4713217" />

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
- PostgreSQL database
- Prisma ORM
- JWT middleware for protected routes
- bcrypt password hashing
- Relational data model (users, products, carts, orders)

---

## 🐳 Docker

 docker-compose -f docker-compose.dev.yml up --build



## 📌 Future Improvements

- Server-side pagination
- Advanced filtering & sorting
- Debounced search
- Loading skeletons
- Product reviews
- Admin panel
