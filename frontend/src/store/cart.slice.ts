import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export interface CartItem {
    id: number;
    count: number;
}
export interface CartState {
    items: CartItem[];
}

const initialState : CartState  = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		increase: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(item => item.id === action.payload);
			if (!existed) {
				state.items.push({id: action.payload, count: 1});
				return;
			}
			if (existed) {
				existed.count++;
			}
		},
		decrease: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) return;

			if (existed.count > 1) {
				existed.count--;
			} else {
				state.items = state.items.filter(i => i.id !== action.payload);
			}
		},
		remove : (state, action: PayloadAction<number>) => {
			const item = state.items.find(i => i.id === action.payload);

			if (!item) return;

			state.items = state.items.filter(i => i.id !== action.payload);
		}
	}
});

export const cartActions = cartSlice.actions;
