import {type FormEvent, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {PREFIX} from '../../helpers/API.ts';
import styles from '../Register/Register.module.css';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link} from 'react-router-dom';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
}
export function Register() {
	const [error, setError] = useState<string | null>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & RegisterForm;
		const {email, password, name} = target;
		console.log(email.value, password.value, name.value);
		await sendRegister(email.value, password.value, name.value);
	};

	const sendRegister = async (email: string, password: string, name: string) => {
		try {
			const {data}= await axios.post(`${PREFIX}/auth/register`, {
				email,
				password,
				name
			});
			console.log(data);
		} catch(e) {
			if (e instanceof AxiosError) {
				console.log(e);
				setError(e.response?.data.error);
			}
		}
	};

	return <div className={styles['register']}>
		<h2 className={styles['title']}>Sign Up</h2>
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
			<div className={styles['row']}>
				<label htmlFor="name">Your name</label>
				<Input id="name" name="name'" type="name" placeholder="Name"/>
			</div>
			<Button appearance="big">Sign Up</Button>
		</form>
		<div className={styles['links']}>
			<div>Have an account?</div>
			<Link to={'/auth/login'}>Log In</Link>
		</div>
	</div>;
};