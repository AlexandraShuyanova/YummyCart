import order from '../../assets/order.png';
import {useNavigate} from 'react-router-dom';
import styles from './Success.module.css';
import Heading from '../../components/Heading/Heading.tsx';
import heart from '../../assets/heart.png';

export function Success() {
	const navigate = useNavigate();

	/*useEffect(() => {
		confetti({
			particleCount: 120,
			spread: 80,
			origin: { y: 0.6 }
		});
	}, []);*/

	return (
		<div className={styles['success']}>
			<img src={order} className={styles['order-image']} alt="Order image" />
			<Heading level={'h2'} className={styles['success-title']}>Thank you for your order!</Heading>
			<div className={styles['subtitle']}>
				Your order is on its way.
				<br />
				Enjoy your meal!
				<br />
				<img className={styles['heart']} src={heart} width="16" height="14" alt="Heart"></img>
			</div>
			<button className={styles['button']} onClick={() => navigate('/')}>
				Continue shopping
				<span>→</span>
			</button>
		</div>
	);
}