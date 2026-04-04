import {Outlet} from 'react-router-dom';
import styles from './Layout.module.css';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {getProfile} from '../../store/user.slice.ts';
import {useEffect, useState} from 'react';
import {getCart} from '../../store/cart.slice.ts';
import SideBar from '../../components/SideBar/SideBar.tsx';

export function Layout() {
	const dispatch = useDispatch<AppDispatch>();
	const jwt = useSelector((state: RootState) => state.user.jwt);
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (!jwt)
			return;
		dispatch(getProfile());
		dispatch(getCart());
	}, [jwt]);

	return (
		<div className={styles['layout']}>
			<SideBar/>
			{menuOpen && (
				<>
					<div
						className={styles.overlay}
						onClick={() => setMenuOpen(false)}
					/>
					<div className={cn(styles['mobile-sidebar'], {
						[styles.open]: menuOpen
					})}>
						<SideBar onMenuOpen={setMenuOpen} isMobile={true}/>
					</div>
				</>
			)}
			<div className={styles['content']}>
				<div className={styles['mobile-header']}>
					<button className={styles['sidebar-button']} onClick={() => setMenuOpen(true)}>☰</button>
				</div>
				<Outlet/>
			</div>
		</div>
	);
};
