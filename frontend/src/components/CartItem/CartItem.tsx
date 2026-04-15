import styles from './CartItem.module.css';
import type {CartItemProps} from './CartItem.props.ts';
import type {AppDispatch} from '../../store/store.ts';
import {useDispatch} from 'react-redux';
import {updateCart} from '../../store/cart.slice.ts';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import removeIcon from '../../assets/remove.svg';
import {Link} from 'react-router-dom';
import IconButton from "../IconButton/IconButton.tsx";

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(updateCart({
			productId: props.id,
			action: 'increase'
		}));
	};
    
	const decrease = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(updateCart({
			productId: props.id,
			action: 'decrease'
		}));
	};

	const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(updateCart({
			productId: props.id,
			action: 'remove'
		}));
	};

	return (
		<div className={styles['item']}>
			<Link to={`/product/${props.id}`} className={styles['link']}>
				<div className={styles['image']} style={{backgroundImage: `url(${props.image})`}}></div>
			</Link>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;€</div>
			</div>
			<div className={styles['actions']}>
				<IconButton variant="minus" onClick={decrease}>
					<img src={minus} alt='Minus icon'></img>
				</IconButton>
				<div className={styles['count']}>{props.count}</div>
				<IconButton variant="plus" onClick={increase}>
					<img src={plus} alt='Plus icon'></img>
				</IconButton>
				<IconButton variant="remove" onClick={remove}>
					<img src={removeIcon} alt='Remove icon'></img>
				</IconButton>
			</div>
		</div>
	);
}

export default CartItem;