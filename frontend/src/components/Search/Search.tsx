import styles from './Search.module.css';
import cn from 'classnames';
import searchIcon from '../../assets/search.svg';

type SearchProps = {
	className?: string;
	onSearch?: (value: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
}

function Search({className, onSearch, onFocus, onBlur} : SearchProps) {
	return (
		<div className={styles['input-wrapper']}>
			<img src={searchIcon} alt="Search icon" className={styles['icon']}></img>
			<input
				className={cn(styles['input'], className)}
				onFocus={onFocus}
				onBlur={onBlur}
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