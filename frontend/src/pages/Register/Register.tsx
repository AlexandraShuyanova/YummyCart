import {type FormEvent, useEffect} from 'react';
import styles from '../Register/Register.module.css';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {login, register, userActions} from '../../store/user.slice.ts';

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
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, registerErrorMessage }= useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(userActions.clearRegisterError());
	}, [dispatch]);

	useEffect(() => {
		if(jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const {email, password, name} = target;
		console.log(email.value, password.value, name.value);
		await dispatch(register({
			email: email.value,
			password: password.value,
			name: name.value
		}));
		await  dispatch(login({
			email: email.value,
			password: password.value
		}));
	};

	return <div className={styles['register']}>
		<h2 className={styles['title']}>Sign Up</h2>
		{registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['row']}>
				<label htmlFor="email">Your email</label>
				<Input id="email" name="email" type="text" placeholder="Email"/>
			</div>
			<div className={styles['row']}>
				<label htmlFor="password">Your password</label>
				<Input id="password" name="password" type="password" placeholder="Password"/>
			</div>
			<div className={styles['row']}>
				<label htmlFor="name">Your name</label>
				<Input id="name" name="name" type="name" placeholder="Name"/>
			</div>
			<Button appearance="big">Sign Up</Button>
		</form>
		<div className={styles['links']}>
			<div>Have an account?</div>
			<Link to={'/auth/login'}>Log In</Link>
		</div>
	</div>;
};