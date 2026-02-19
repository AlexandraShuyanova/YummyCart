import styles from './Login.module.css';
import {Link} from 'react-router-dom';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {type FormEvent, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {PREFIX} from '../../helpers/API.ts';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
}

export function Login() {
	const [error, setError] = useState<string | null>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;
		console.log(email.value, password.value);
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const {data}= await axios.post(`${PREFIX}/auth/login`, {
				email,
				password
			});
			console.log(data);
		} catch(e) {
			if (e instanceof AxiosError) {
				setError(e.response?.data.error);
				console.log(e);
			}
		}
	};

	return <div className={styles['login']}>
		<h2 className={styles['title']}>Log In</h2>
		{error && <div className={styles['error']}>{error}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['row']}>
				<label htmlFor="email">Your email</label>
				<Input id="email" name="email" type="text" placeholder="Email"/>
			</div>
			<div className={styles['row']}>
				<label htmlFor="password">Your password</label>
				<Input id="password" name="password'" type="password" placeholder="Password"/>
			</div>
			<Button appearance="big">Log In</Button>
		</form>
		<div className={styles['links']}>
			<div>Don't have an account?</div>
			<Link to={'/auth/register'}>Sign Up</Link>
		</div>
	</div>;
};