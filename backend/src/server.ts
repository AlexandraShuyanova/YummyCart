const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

import type { Request, Response, NextFunction } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = 3001;

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

interface Cart {
    userId: number;
    items: {
        productId: number;
        count: number
    }[];
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

    if (!email || !password || !name) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        return res.status(400).json({
            error: 'User already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
});


app.post('/pizza-api/auth/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user =  await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) return res.status(400).json({
        error: 'User not found'
    });

    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) return res.status(400).json({
        error: 'Invalid password'
    });

    if (!email || !password) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token });
});


app.get('/pizza-api/user/profile', auth, async (req: AuthRequest, res: Response) => {

    const user =  await prisma.user.findUnique({
        where: {
            id: req.user!.id
        }
    });

    if (!user)
        return res.status(404).json({
            error: 'User not found'
        });
    res.json({ id: user.id, email: user.email, name: user.name });
});


app.get('/pizza-api/products', async(req: Request, res: Response) => {
    const filter = String(req.query.filter ?? '').toLowerCase();
    console.log(filter);

    let products = await prisma.product.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: filter,
                        mode: 'insensitive'
                    }
                },
                {
                    ingredients: {
                        has: filter
                    }
                }
            ]
        }
    })
    res.json(products);
});

app.get('/pizza-api/cart', auth, async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;

    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    })

    if (!cart) {
        return res.json({items: []});
    }

    const items = await prisma.cartItem.findMany({
        where: {
            cartId: cart.id
        },
        include: {
            product: true
        },
        orderBy: {
            id: 'asc'
        }
    })
    res.json({ items: items});
});

app.post('/pizza-api/cart/update', auth, async(req: AuthRequest, res: Response) => {
    const { productId, action } = req.body;
    const userId = req.user!.id;

    let cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    })

    if(!cart) {
        cart = await prisma.cart.create({
            data: {
                userId
            }
        });
    }

    const  existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId
        }
    })

    if(action === 'increase') {
        if(existingItem) {
            await prisma.cartItem.update({
                where: {
                    id: existingItem.id
                },
                data: {
                    count: {
                        increment: 1
                    }
                }
            });
        }
        else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    count: 1
                }
            })
        }
    }
    if (action === 'decrease') {
        if (existingItem) {
            if (existingItem.count > 1) {
                await prisma.cartItem.update({
                    where: {
                        id: existingItem.id
                    },
                    data: {
                        count: {
                            decrement: 1
                        }
                    }
                })
            }
            else {
                await prisma.cartItem.delete({
                    where: {
                        id: existingItem.id
                    }
                })
            }
        }
    }
    if (action === 'remove') {
        if (existingItem) {
            await prisma.cartItem.delete({
                where: {
                    id: existingItem.id
                }
            })
        }
    }
    if (action === 'clear') {
        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        })
    }

    let items = await prisma.cartItem.findMany({
        where: {
            cartId: cart.id,
        },
        include: {
            product: true
        },
        orderBy: {
            id: 'asc'
        }
    })
    res.json({items: items});
});

app.get('/pizza-api/products-paged', async(req: Request, res: Response) => {
    const {
        page = '1',
        size = '6',
        sortBy = 'name',
        order = 'asc',
    } = req.query;

    const filter = String(req.query.filter ?? '').toLowerCase();
    const categoryId = Number(req.query.categoryId);

    let products;

    if (filter) {
        products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: filter,
                            mode: 'insensitive'
                        }
                    },
                    {
                        ingredients: {
                            has: filter
                        }
                    }
                ]
            },
        })
    } else if (!Number.isNaN(categoryId)) {
        products = await prisma.product.findMany({
            where: {
                categories: {
                    some: {
                        id: categoryId
                    }
                }
            }
        });
    } else {
        return res.json({
            page: page,
            size: size,
            total: size,
            totalPages: 1,
            items: []
        });
    }


    /*let list = [...products];

    // 🔃 Sorting
    if (sortby && typeof sortby === 'string') {
        list.sort((a: any, b: any) => {
            if (a[sortby] < b[sortby]) return order === 'desc' ? 1 : -1;
            if (a[sortby] > b[sortby]) return order === 'desc' ? -1 : 1;
            return 0;
        });
    }*/

    /*// 📄 Pagination
    const pageNum = Number(page);
    const sizeNum = Number(size);
    const start = pageNum * sizeNum;
    const end = start + sizeNum;

    const paginated = list.slice(start, end);*/

    /*res.json({
        page: pageNum,
        size: sizeNum,
        total: list.length,
        totalPages: Math.ceil(list.length / sizeNum),
        items: paginated
    });*/

    res.json({
        page: page,
        size: size,
        total: size,
        totalPages: 1,
        items: products
    })
});

app.get('/pizza-api/categories', async(req: Request, res: Response) => {
    const categories = await prisma.category.findMany();

    res.json(categories)
});

app.get('/pizza-api/categories/:id', async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({
        where: {
            id
        },
        include: {
            products: true
        }
    })
    if (!category)
        return res.status(404).json({
            error: 'Not found'
        });
    res.json(category?.products);
})

app.get('/pizza-api/products/:id', async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product =  await prisma.product.findUnique({
        where: {
            id
        }
    });

    if (!product)
        return res.status(404).json({
            error: 'Not found'
        });
    res.json(product);
});

app.post('/pizza-api/order', auth, async(req: AuthRequest, res: Response) => {
    const { products } = req.body;

    if (!Array.isArray(products)) return res.status(400).json({
        error: 'Invalid products format'
    });

    const order = await prisma.order.create({
        data: {
            userId: req.user!.id,
            products: {
                create: products.map(item => ({
                    productId: item.productId,
                    count: item.count
                }))
            },
        }
    })
    res.json({ message: 'Order created', order });
});


// ===== START SERVER =====
app.listen(PORT, () => console.log(`TS Backend running on port ${PORT}`));