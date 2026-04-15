import styles from './SideBar.module.css';
import cn from 'classnames';
import avatar from '../../assets/avatar.png';
import {NavLink, useNavigate} from 'react-router-dom';
import menu from '../../assets/menu.svg';
import cart from '../../assets/cart.svg';
import Button from '../Button/Button.tsx';
import exitBtn from '../../assets/exitBtn.svg';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {userActions} from '../../store/user.slice.ts';
import IconButton from '../IconButton/IconButton.tsx';

type SideBarProps = {
	onMenuOpen?: (value: boolean) => void;
	isMobile?: boolean;
};

function SideBar({onMenuOpen, isMobile=false} : SideBarProps) {
    
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const profile = useSelector((state: RootState) => state.user.profile);
	const cartItems = useSelector((state: RootState) => state.cart.items);


	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};
    
	return (
		<div className={cn(
			styles['sidebar'],
			{ [styles['mobile']]: isMobile }
		)}>
			<div className={styles['user']}>
				<img className={styles['avatar']} src={avatar} alt="User's avatar"></img>
				<div className={styles['name']}>{profile?.name}</div>
				<div className={styles['email']}>{profile?.email}</div>
			</div>
			<IconButton
				className={styles['close-button']}
				variant="ghost"
				onClick={() => onMenuOpen?.(false)}
			>
                ✕
			</IconButton>
			<div className={styles['menu']}>
				<NavLink to='/'
				         onClick={() => onMenuOpen?.(false)}
						 className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
					<img src={menu} alt="Menu icon"/>
					<span>Menu</span>
				</NavLink>
				<NavLink to='/cart'
						 onClick={() => onMenuOpen?.(false)}
						 className={({isActive}) => cn(styles['link'], {
						[styles['active']]: isActive
					})}>
					<img src={cart} alt="Cart icon"/>Cart
					<span
						className={styles['cart-count']}>{cartItems.reduce((acc, item) => acc += item.count, 0)}</span>
				</NavLink>
			</div>
			<Button className={styles['exit-button']} appearance="small" onClick={logout}>
				<img src={exitBtn}></img>
                Exit
			</Button>
		</div>
	);
};

export default SideBar;