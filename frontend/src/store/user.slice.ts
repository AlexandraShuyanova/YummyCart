import {createAsyncThunk, createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {loadState} from './storage.ts';
import axios from 'axios';
import type {LoginResponse} from '../interfaces/auth.interface.ts';
import {PREFIX} from '../helpers/API.ts';

export const JWT_KEY = 'jwtData';

export interface JwtDataType {
    jwt: null | string;
}
export interface UserState {
    jwt: null | string;
	loginErrorMessage?: string;
}

const initialState : UserState  = {
	jwt: loadState<JwtDataType>(JWT_KEY )?.jwt  ?? null
};

export const login = createAsyncThunk('user/login',
	async (params: {email: string; password: string}) => {
		const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
			email: params.email,
			password: params.password
		});
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
			state.jwt = action.payload.token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
	}
});

export const userActions = userSlice.actions;
