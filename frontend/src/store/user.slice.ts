import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadState} from './storage.ts';
import axios, {AxiosError} from 'axios';
import type {LoginResponse, RegisterResponse} from '../interfaces/auth.interface.ts';
import {PREFIX} from '../helpers/API.ts';
import type {Profile} from '../interfaces/user.interface.ts';
import type {RootState} from './store.ts';

export const JWT_KEY = 'jwtData';

export interface JwtDataType {
    jwt: null | string;
}
export interface UserState {
    jwt: null | string;
	loginErrorMessage?: string;
	registerErrorMessage?: string;
	profile?: Profile;
}

const initialState : UserState  = {
	jwt: loadState<JwtDataType>(JWT_KEY )?.jwt  ?? null
};

export const getProfile = createAsyncThunk<Profile, void, {state: RootState}>('user/getProfile',
	async (_, thunkApi) => {
		try {
			const jwt = thunkApi.getState().user.jwt;
			const {data} = await axios.get<Profile>(`${PREFIX}/user/profile`, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			});
			return data;
		} catch (e) {
			thunkApi.dispatch(userActions.logout());
			throw e;
		}
	}
);

export const register = createAsyncThunk('user/register',
	async (params: {email: string; password: string; name: string}) => {
		try {
			const {data} = await axios.post<RegisterResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				password: params.password,
				name: params.name
			});
			return data;
		} catch (e) {

			if (e instanceof AxiosError) {
				console.log(e);
				throw new Error(e.response?.data.error);
			}
		}
	}
);

export const login = createAsyncThunk('user/login',
	async (params: {email: string; password: string}) => {
		try {
			const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email: params.email,
				password: params.password
			});
			return data;
		} catch (e) {

			if (e instanceof AxiosError) {
				console.log(e);
				throw new Error(e.response?.data.error);
			}
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
			state.profile = undefined;
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		clearRegisterError: (state) => {
			state.registerErrorMessage = undefined;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if(!action.payload) {
				return;
			}
			state.jwt = action.payload.token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			if(!action.payload) {
				return;
			}
			state.jwt = action.payload.token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.registerErrorMessage = action.error.message;
		});
	}
});

export const userActions = userSlice.actions;
