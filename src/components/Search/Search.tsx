import styles from './Search.module.css';

function Search() {
	return (
		<div className={styles['input-wrapper']}>
			<img src="/public/search.svg" className={styles['icon']}></img>
			<input className={styles['input']} placeholder="Enter dish or ingredients"/>
		</div>
	);
}

export default Search;