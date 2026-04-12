import styles from './CartBar.module.css';
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import {useNavigate} from "react-router-dom";

function CartBar() {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const navigate = useNavigate();
	const itemsCount = cartItems.reduce((acc, item) => acc += item.count, 0);

	return (
		<button className={styles['cart-bar']} onClick={() => navigate('/cart')}>
			<span className={styles['summary']}>
				<span key={itemsCount} className={styles['count']}>{itemsCount}</span>
				items
			</span>
			<span>View cart</span>
		</button>
	);
}

export default CartBar;
