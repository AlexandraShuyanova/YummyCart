const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

import type { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/pizza-api/', (req: Request, res: Response) => {
    res.json({ message: 'Pizza API is running', version: '1.0' });
});

const JWT_SECRET = 'SUPER_SECRET_KEY';

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    ingredients: string[];
    image: string;
    rating: number;
}

interface OrderItem {
    id: number;
    count: number;
}


interface Order {
    id: number;
    userId: number;
    products: OrderItem[];
    createdAt: Date;
}


interface AuthRequest extends Request {
    user?: { id: number; email: string };
}


// ===== MOCK DATABASE =====
const users: User[] = [];
const products: Product[] = [
    { id: 1, name: 'Наслаждение', price: 300, ingredients: ['салями','руккола','помидоры','оливки'], image: 'https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food1.png', rating: 4.7 },
    { id: 2, name: 'Такос', price: 280, ingredients: ['острый перец','лепёшка','фарш'], image: 'https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food2.png', rating: 4.8 },
    { id: 3, name: 'Аццки острая', price: 320, ingredients: ['острый соус','грибы','помидоры','оливки'], image: 'https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food3.png', rating: 4.9 },
    { id: 4, name: 'Жаркое с сыром', price: 290, ingredients: ['картофель','сыр','перец','фарш'], image: 'https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food4.png', rating: 4.4 },
    { id: 5, name: 'Цезарь с курицей', price: 290, ingredients: ['курица','сыр','соус Цезарь','помидоры'], image: 'https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food5.png', rating: 4.8 },
    { id: 6, name: 'Зелёный салат', price: 290, ingredients: ['огурец','орехи','перец'], image: 'https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food6.png', rating: 4.5 }
];
const orders: Order[] = [];


// ===== AUTH MIDDLEWARE =====
function auth(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as { id: number; email: string };
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
}


// ===== ROUTES =====


app.post('/pizza-api/auth/register', async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    if (users.find(u => u.email === email)) return res.status(400).json({ error: 'User already exists' });


    const hashed = await bcrypt.hash(password, 10);
    const newUser: User = { id: users.length + 1, email, name, password: hashed };
    users.push(newUser);


    res.json({ message: 'User registered', user: { id: newUser.id, email, name } });
});


app.post('/pizza-api/auth/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ error: 'User not found' });


    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) return res.status(400).json({ error: 'Invalid password' });


    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
});


app.get('/pizza-api/user/profile', auth, (req: AuthRequest, res: Response) => {
    const user = users.find(u => u.id === req.user!.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name });
});


app.get('/pizza-api/products', (req: Request, res: Response) => {
    const { name } = req.query;
    let list = products;
    if (name && typeof name === 'string') list = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    res.json(list);
});


app.get('/pizza-api/products/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
});


app.post('/pizza-api/order', auth, (req: AuthRequest, res: Response) => {
    const { products: items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid products format' });


    const order: Order = { id: orders.length + 1, userId: req.user!.id, products: items, createdAt: new Date() };
    orders.push(order);
    res.json({ message: 'Order created', order });
});


// ===== START SERVER =====
app.listen(PORT, () => console.log(`TS Backend running on port ${PORT}`));