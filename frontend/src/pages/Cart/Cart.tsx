import styles from './Cart.module.css';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import CartItem from '../../components/CartItem/CartItem.tsx';
import {useEffect, useState} from 'react';
import type {Product} from '../../interfaces/product.interface.ts';
import {PREFIX} from '../../helpers/API.ts';
import axios from 'axios';
import Button from '../../components/Button/Button.tsx';
import {useNavigate} from 'react-router-dom';
import {updateCart} from '../../store/cart.slice.ts';
import Header from '../../components/Header/Header.tsx';
import arrow from '../../assets/left-arrow.svg';
import IconButton from '../../components/IconButton/IconButton.tsx';

const DELIVERY_FEE = 5;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>();
	const items = useSelector((state: RootState) => state.cart.items);
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const total = items.length > 0 && items.map((i => {
		const product = cartProducts?.find(p => p.id === i.productId);
		if (!product) {
			return 0;
		}
		return product.price * i.count;
	})).reduce((acc, price) => acc += price, 0);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async() => {
		const products = await Promise.all(items.map((item) => getItem(item.productId)));
		if(products.length === 0) {
			setCartProducts([]);
			return;
		}
		setCartProducts(products);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	const checkout = async() => {
		await axios.post(`${PREFIX}/order`, {
			products: items
		}, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(updateCart({productId: 0, action: 'clear'}));
		navigate('/success');
	};

	return (
		<>
			<div className={styles['header']}>
				<IconButton className={styles['back']} variant="ghost" onClick={() => navigate(-1)}>
					<img src={arrow} alt={'Back icon'}></img>
				</IconButton>
				<Header>Cart</Header>
			</div>
			{items.length === 0 && <div className={styles['empty']}>Your cart is empty</div>}

			{items.length > 0 && items.map((i => {
				const product = cartProducts?.find(p => p.id === i.productId);
				if (!product) {
					return;
				}
				return <CartItem key={i.productId} {...product} count={i.count}/>;
			}
			))}

			{items.length > 0 && (
				<div>
					<div className={styles['row']}>
						<div className={styles['text']}>Total</div>
						<div className={styles['price']}>{total}&nbsp;<span>€</span></div>
					</div>
					<hr className={styles['hr']}/>
					<div className={styles['row']}>
						<div className={styles['text']}>Delivery</div>
						<div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>€</span></div>
					</div>
					<hr className={styles['hr']}/>
					<div className={styles['row']}>
						<div className={styles['text']}>Total <span
							className={styles['total-count']}>({items.reduce((acc, item) => acc += item.count, 0)})</span>
						</div>
						<div className={styles['price']}>{total && total + DELIVERY_FEE}&nbsp;<span>€</span></div>
					</div>
					<div className={styles['order-btn-wrapper']}>
						<Button className={styles['order-btn']} appearance={'big'} disabled={items.length === 0} onClick={checkout}>Place order</Button>
					</div>
				</div>
			)}
		</>
	);
};