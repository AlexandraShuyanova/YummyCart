import styles from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {type FormEvent, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {login, userActions} from '../../store/user.slice.ts';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
}

export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage}= useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(userActions.clearLoginError());
	}, [dispatch]);

	useEffect(() => {
		if(jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		console.log(email.value, password.value);
		dispatch(login({email: email.value, password: password.value}));
	};

	return <div className={styles['login']}>
		<h2 className={styles['title']}>Log In</h2>
		{loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['row']}>
				<label htmlFor="email">Your email</label>
				<Input id="email" name="email" type="text" placeholder="Email"/>
			</div>
			<div className={styles['row']}>
				<label htmlFor="password">Your password</label>
				<Input id="password" name="password" type="password" placeholder="Password"/>
			</div>
			<Button appearance="big">Log In</Button>
		</form>
		<div className={styles['links']}>
			<div>Don't have an account?</div>
			<Link to={'/auth/register'}>Sign Up</Link>
		</div>
	</div>;
};