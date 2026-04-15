import styles from './IconButton.module.css';
import type {IconButtonProps} from './IconButton.props.ts';
import cn from 'classnames';

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