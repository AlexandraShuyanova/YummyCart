import styles from './Input.module.css';
import cn from 'classnames';
import type {InputProps} from './Input.props.ts';

function Input({isValid=true,...props} : InputProps) {
	return (
		<input {...props} className={cn(styles['input'], {
			[styles['invalid']]: !isValid
		})}{...props}/>
	);
};

export default Input;