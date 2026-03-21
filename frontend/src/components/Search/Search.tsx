import styles from './Search.module.css';
import cn from 'classnames';
import searchIcon from '../../assets/search.svg';

function Search({className, onSearch} : {className?: string, onSearch?: (value: string) => void}) {
	return (
		<div className={styles['input-wrapper']}>
			<img src={searchIcon} alt="Search icon" className={styles['icon']}></img>
			<input
				className={cn(styles['input'], className)}
				placeholder="Enter dish or ingredients"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						const value = (e.target as HTMLInputElement).value;
						if (onSearch) {
							onSearch(value);
						}
					}
				}}
			/>
		</div>
	);
}

export default Search;