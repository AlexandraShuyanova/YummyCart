import styles from './CartItem.module.css';
import type {CartItemProps} from './CartItem.props.ts';
import type {AppDispatch} from '../../store/store.ts';
import {useDispatch} from 'react-redux';
import {cartActions} from '../../store/cart.slice.ts';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const addCount = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};
    
	const removeCount = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.remove(props.id));
	};

	const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles['item']}>
			<div className={styles['image']} style={{backgroundImage: `url(${props.image}})`}}></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['button']} onClick={removeCount}></button>
				<div>{props.count}</div>
				<button className={styles['button']} onClick={addCount}></button>
				<button className={styles['button']} onClick={remove}></button>
			</div>
		</div>
	);
}

export default CartItem;