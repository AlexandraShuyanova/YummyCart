import styles from './Button.module.css';
import type {ButtonProps} from './Button.props.ts';
import cn from 'classnames';

function Button({children, appearance='small', ...props} : ButtonProps) {
	return (
		<button className={cn(styles['button'], styles['accent'], {
			[styles['big']]: appearance === 'big',
			[styles['small']]: appearance === 'small'

		})} {...props}>{children}</button>
	);
}

export default Button;