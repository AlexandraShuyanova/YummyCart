import styles from './LoginForm.module.css';
import type {LoginFormProps} from './LoginForm.props.ts';
import Input from '../Input/Input.tsx';
import Button from '../Button/Button.tsx';

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