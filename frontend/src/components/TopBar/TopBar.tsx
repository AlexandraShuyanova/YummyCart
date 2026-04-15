import styles from './TopBar.module.css';
import Header from '../Header/Header.tsx';
import IconButton from "../IconButton/IconButton.tsx";

type TopBarProps = {
    onOpenMenu?: () => void;
    title?: string;
}

function TopBar({onOpenMenu, title}:TopBarProps) {
	return (
		<div className={styles['top-bar']}>
			<IconButton className={styles['burger']} variant='ghost' onClick={onOpenMenu}>☰</IconButton>
			<Header className={styles['title']}>{title}</Header>
		</div>
	);
}

export default TopBar;