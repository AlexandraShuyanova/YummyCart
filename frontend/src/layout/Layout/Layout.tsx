import {NavLink, Outlet} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';
import cn from 'classnames';
import avatar from '../../assets/avatar.png';
import menu from '../../assets/menu.svg';
import cart from '../../assets/cart.svg';
import exitBtn from '../../assets/exitBtn.svg';

export function Layout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['avatar']} src={avatar} alt="User's avatar"></img>
					<div className={styles['name']}>Anton Larichev</div>
					<div className={styles['email']}>alaricode@ya.ru</div>
				</div>
				<div className={styles['menu']}>
					<NavLink to='/' className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src={menu} alt="Menu icon"/>
						<span>Menu</span>
					</NavLink>
					<NavLink to='/cart' className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
						<img src={cart} alt="Cart icon"/>
						<span>Cart</span>
					</NavLink>
				</div>
				<Button className={styles['exit']} appearance="small">
					<img src={exitBtn}></img>
					Exit
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet/>
			</div>
		</div>
	);
};
