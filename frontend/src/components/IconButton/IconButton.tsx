import styles from './IconButton.module.css';
import cn from 'classnames';
import type {ButtonHTMLAttributes, ReactNode} from 'react';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	children: ReactNode;
	variant?: 'default' | 'ghost' | 'plus' | 'minus' | 'remove';
}

function IconButton({children, className, variant='default', ...props} : IconButtonProps) {
	return (
		<button className={cn(
			styles[variant],
			className
		)}
		{...props}
		>{children}</button>
	);
}

export default IconButton;