import pizza from '../../assets/pizza.svg';
import Button from '../../components/Button/Button';
import {useNavigate} from 'react-router-dom';
import styles from './Success.module.css';
import confetti from 'canvas-confetti';
import {useEffect} from 'react';

export function Success() {
	const navigate = useNavigate();

	useEffect(() => {
		confetti({
			particleCount: 120,
			spread: 80,
			origin: { y: 0.6 }
		});
	}, []);

	return (
		<div className={styles['success']}>
			<img src={pizza} alt="Pizza image" className={styles['pizza']} />
			<div className={styles['text']}>Order placed successfully!</div>
			<div className={styles['subtitle']}>Your order is on the way</div>
			<Button appearance={'big'} className={styles['button']} onClick={() => navigate('/')}>
				Order again
			</Button>
		</div>
	);
}