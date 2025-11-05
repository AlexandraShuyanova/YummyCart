import styles from './Search.module.css';
import cn from 'classnames';

function Search(className?: any) {
	return (
		<div className={styles['input-wrapper']}>
			<img src="/public/search.svg" className={styles['icon']}></img>
			<input className={cn(styles['input'], className)} placeholder="Enter dish or ingredients"/>
		</div>
	);
}

export default Search;