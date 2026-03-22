import styles from './CartItem.module.css';
import type {CartItemProps} from './CartItem.props.ts';
import type {AppDispatch} from '../../store/store.ts';
import {useDispatch} from 'react-redux';
import {cartActions} from '../../store/cart.slice.ts';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import removeIcon from '../../assets/remove.svg';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.increase(props.id));
	};
    
	const decrease = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.decrease(props.id));
	};

	const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles['item']}>
			<div className={styles['image']} style={{backgroundImage: `url(${props.image})`}}></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={decrease}>
					<img src={minus} alt='Minus icon'></img>
				</button>
				<div className={styles['count']}>{props.count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src={plus} alt='Plus icon'></img>
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src={removeIcon} alt='Remove icon'></img>
				</button>
			</div>
		</div>
	);
}

export default CartItem;