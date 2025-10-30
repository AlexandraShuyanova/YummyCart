import {NavLink, Outlet} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';
import cn from 'classnames';

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
					<NavLink to='/' className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src="/public/menu.svg" alt="Menu icon"/>
						<span>Menu</span>
					</NavLink>
					<NavLink to='/cart' className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src="/public/cart.svg" alt="Cart icon"/>
						<span>Cart</span>
					</NavLink>
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
