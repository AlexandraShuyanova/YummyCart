import {Link, Outlet} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';

export function Layout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['avatar']} src="/avatar.png" alt="User's avatar"></img>
					<div className={styles['name']}>Anton Larichev</div>
					<div className={styles['email']}>alaricode@ya.ru</div>
				</div>
				<div className={styles['menu']}>
					<Link to='/' className={styles['link']}>
						<img src="/public/menu.svg" alt="Menu icon"/>
						<span>Menu</span>
					</Link>
					<Link to='/cart' className={styles['link']}>
						<img src="/public/cart.svg" alt="Cart icon"/>
						<span>Cart</span>
					</Link>
				</div>
				<Button className={styles['exit']} appearance="small">
					<img src="/public/exitBtn.svg"></img>
					Exit
				</Button>
			</div>
			<Outlet/>
		</div>
	);
};
