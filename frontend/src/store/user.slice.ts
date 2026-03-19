import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loadState} from './storage.ts';
import axios, {AxiosError} from 'axios';
import type {LoginResponse} from '../interfaces/auth.interface.ts';
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
	profile?: Profile;
}

const initialState : UserState  = {
	jwt: loadState<JwtDataType>(JWT_KEY )?.jwt  ?? null
};

export const getProfile = createAsyncThunk<Profile, void, {state: RootState}>('user/getProfile',
	async (_, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;
		const {data} = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			}
		});
		return data;
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
		},
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
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
			if(action.error.message)
				state.loginErrorMessage = action.error.message;
			else
				state.loginErrorMessage = 'Login failed';
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
	}
});

export const userActions = userSlice.actions;
