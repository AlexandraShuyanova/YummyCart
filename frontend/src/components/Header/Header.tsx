import styles from './Header.module.css';
import type {HeaderProps} from './Header.props.ts';
import cn from 'classnames';


function Header({children, className, ...props} : HeaderProps) {
	return (
		<h1 className={cn(styles['h1'], className)} {...props}>{children}</h1>
	);
}

export default Header;