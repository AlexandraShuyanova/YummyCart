import styles from './Cart.module.css';
import Header from '../../components/Header/Header.tsx';
import {useSelector} from 'react-redux';
import type {RootState} from '../../store/store.ts';
import CartItem from '../../components/CartItem/CartItem.tsx';
import {useEffect, useState} from 'react';
import type {Product} from '../../interfaces/product.interface.ts';
import {PREFIX} from '../../helpers/API.ts';
import axios from 'axios';

export function Cart() {
	const [cartProducts, setCartProducts] = useState<Product[]>();
	const items = useSelector((state: RootState) => state.cart.items);

	const getItem = async (id: number) => {
		const {data} = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	};

	const loadAllItems = async() => {
		const products = await Promise.all(items.map((item) => getItem(item.id)));
		setCartProducts(products);
	};

	useEffect(() => {
		loadAllItems();
	}, [items]);

	return (
		<>
			<Header className={styles['header']}>Cart</Header>
			{items.length > 0 && items.map((i=> {
				const product = cartProducts?.find(p => p.id === i.id);
				if(!product) {
					return;
				}
				return <CartItem key={i.id} {...product} count={i.count} />;
			}
			))}
			{items.length === 0 && <div className={styles['empty']}>Your cart is empty</div>}
		</>
	);
};