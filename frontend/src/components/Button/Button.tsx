import styles from './Button.module.css';
import cn from 'classnames';
import type {ButtonHTMLAttributes, ReactNode} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	children: ReactNode;
	appearance?: 'big' | 'small';
}

function Button({children, appearance='small', className, ...props} : ButtonProps) {
	return (
		<button className={cn(styles['button'], styles['accent'], className, {
			[styles['big']]: appearance === 'big',
			[styles['small']]: appearance === 'small'
		})}{...props}
		>{children}</button>
	);
}

export default Button;