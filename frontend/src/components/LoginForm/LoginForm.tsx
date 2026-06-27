import styles from './LoginForm.module.css';
import Input from '../Input/Input.tsx';
import Button from '../Button/Button.tsx';
import type {FormHTMLAttributes} from 'react';

export interface LoginFormProps extends FormHTMLAttributes<HTMLFormElement> {
	label?: string
}

function LoginForm({className, ...props} : LoginFormProps) {
	return <form className={styles['login-form']} {...props}>
		<div className={styles['form-row']}>
			<label htmlFor="email">Your email</label>
			<Input id="email" type="text" placeholder="Email"/>
		</div>
		<div className={styles['form-row']}>
			<label htmlFor="password">Your password</label>
			<Input id="password" type="password" placeholder="Password"/>
		</div>
		<Button appearance="big">Log In</Button>
	</form>;
}

export default LoginForm;