import styles from './TopBar.module.css';
import Header from '../Header/Header.tsx';

type TopBarProps = {
    onOpenMenu?: () => void;
    title?: string;
}

function TopBar({onOpenMenu, title}:TopBarProps) {
	return (
		<div className={styles['top-bar']}>
			<button className={styles['top-bar-menu-button']} onClick={onOpenMenu}>☰</button>
			<Header className={styles['title']}>{title}</Header>
		</div>
	);
}

export default TopBar;