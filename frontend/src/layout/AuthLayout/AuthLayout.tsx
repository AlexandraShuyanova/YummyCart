import {Outlet} from 'react-router-dom';
import styles from './AuthLayout.module.css';
import logo from '../../assets/auth-logo.svg';

export function AuthLayout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['logo']}>
				<img className={styles['logo']} src={logo} alt="Logo"></img>
			</div>
			<div className={styles.divider}/>
			<div className={styles['content']}>
				<Outlet/>
			</div>
		</div>
	);
};
