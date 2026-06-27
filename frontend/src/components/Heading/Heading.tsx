import styles from './Heading.module.css';
import cn from 'classnames';
import type {HTMLAttributes, ReactNode} from 'react';

export interface HeadingProps extends HTMLAttributes<HTMLElement>{
	level?: 'h1' | 'h2' | 'h3',
	children: ReactNode;
}

function Heading({children, level = 'h1', className, ...props} : HeadingProps) {
	const Tag = level;
	return (
		<Tag className={cn(styles[level], className)} {...props}>{children}</Tag>
	);
}

export default Heading;