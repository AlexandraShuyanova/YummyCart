import styles from './LoginForm.module.css';
import type {LoginFormProps} from './LoginForm.props.ts';
import Input from '../Input/Input.tsx';
import Button from '../Button/Button.tsx';

function LoginForm({className, ...props} : LoginFormProps) {
	return (
		<form className={styles['login-form']} {...props}>
			<div className={styles['form-row']}>
				<label>Your email</label>
				<Input type="text" placeholder="Email"/>
			</div>
			<div className={styles['form-row']}>
				<label>Your password</label>
				<Input type="text" placeholder="Password"/>
			</div>
			<Button appearance="big">Sign In</Button>
			<Button appearance="small">Accept</Button>
		</form>
	);
}

export default LoginForm;