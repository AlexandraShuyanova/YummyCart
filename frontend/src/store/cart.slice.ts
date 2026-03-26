import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store.ts';
import axios from 'axios';
import {PREFIX} from '../helpers/API.ts';

export interface CartItem {
    productId: number;
    count: number;
}
export interface CartState {
    items: CartItem[];
	errorMessage?: string;
}

const initialState : CartState  = {
	items: []
};

export const getCart = createAsyncThunk<
	CartState,
	void,
	{ state: RootState }>('cart/getCart',
		async(_, thunkApi) => {
			const jwt = thunkApi.getState().user.jwt;
			const { data } = await axios.get<CartState>(`${PREFIX}/cart`, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			});
			return data;
		}
	);

export const updateCart = createAsyncThunk<
	CartState,
	{ productId: number; action: 'increase' | 'decrease' | 'remove'  | 'clear'},
	{ state: RootState }
>(
	'cart/updateCart',
	async ({ productId, action }, thunkApi) => {
		const jwt = thunkApi.getState().user.jwt;

		const { data } = await axios.post<CartState>(
			`${PREFIX}/cart/update`,
			{ productId, action },
			{
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			}
		);
		return data;
	}
);

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCart.fulfilled, (state, action) => {
			state.items = action.payload.items;
		});
		builder.addCase(getCart.rejected, (state, action) => {
			state.errorMessage = action.error.message;
			alert(state.errorMessage);
		});
		builder.addCase(updateCart.fulfilled, (state, action) => {
			state.items = action.payload.items;
		});
		builder.addCase(updateCart.rejected, (state, action) => {
			state.errorMessage = action.error.message;
			alert(state.errorMessage);
		});
	}
});

export const cartActions = cartSlice.actions;
