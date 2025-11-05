import Header from '../../components/Header/Header.tsx';
import styles from './Menu.module.css';
import Search from '../../components/Search/Search.tsx';

export function Menu() {
	return (
		<div className={styles['head']}>
			<Header>Menu</Header>
			<Search/>
		</div>
	);
};