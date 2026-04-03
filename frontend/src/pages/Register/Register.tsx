import {type FormEvent, useEffect} from 'react';
import styles from '../Register/Register.module.css';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from '../../store/store.ts';
import {register, userActions} from '../../store/user.slice.ts';
import logo from "../../assets/auth-logo.svg";

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
	};

	return (
		<div className={styles['register']}>
			<img src={logo} className={styles['mobile-logo']} alt="Logo"/>
			<h2 className={styles['title']}>Sign Up</h2>
			{registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
			<form className={styles['form']} onSubmit={submit} onChange={() => {
				if (registerErrorMessage) {
					dispatch(userActions.clearRegisterError());
				}
			}}>
				<div className={styles['row']}>
					<label htmlFor="email">Your email</label>
					<Input required id="email" name="email" type="text" placeholder="Email"/>
				</div>
				<div className={styles['row']}>
					<label htmlFor="password">Your password</label>
					<Input required id="password" name="password" type="password" placeholder="Password"/>
				</div>
				<div className={styles['row']}>
					<label htmlFor="name">Your name</label>
					<Input required id="name" name="name" type="name" placeholder="Name"/>
				</div>
				<Button appearance="big">Sign Up</Button>
			</form>
			<div className={styles['links']}>
				<div>Have an account?</div>
				<Link to={'/auth/login'}>Log In</Link>
			</div>
		</div>
	);
};