import styles from './Input.module.css';
import cn from 'classnames';
import type {InputHTMLAttributes} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean;
}

function Input({isValid=true,...props} : InputProps) {
	return (
		<input {...props} className={cn(styles['input'], {
			[styles['invalid']]: !isValid
		})}{...props}/>
	);
};

export default Input;