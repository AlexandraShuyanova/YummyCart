import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button.tsx';
import cn from 'classnames';
import avatar from '../../assets/avatar.png';
import menu from '../../assets/menu.svg';
import cart from '../../assets/cart.svg';
import exitBtn from '../../assets/exitBtn.svg';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {getProfile, userActions} from '../../store/user.slice.ts';
import {useEffect} from 'react';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((state: RootState) => state.user.profile);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['avatar']} src={avatar} alt="User's avatar"></img>
					<div className={styles['name']}>{profile?.name}</div>
					<div className={styles['email']}>{profile?.email}</div>
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
				<Button className={styles['exit']} appearance="small" onClick={logout}>
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
