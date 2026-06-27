import styles from './TopBar.module.css';
import Heading from '../Heading/Heading.tsx';
import IconButton from "../IconButton/IconButton.tsx";

type TopBarProps = {
    onOpenMenu?: () => void;
    title?: string;
}

function TopBar({onOpenMenu, title}:TopBarProps) {
	return (
		<div className={styles['top-bar']}>
			<IconButton className={styles['burger']} variant='ghost' onClick={onOpenMenu}>☰</IconButton>
			<Heading className={styles['title']}>{title}</Heading>
		</div>
	);
}

export default TopBar;