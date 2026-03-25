import {configureStore} from '@reduxjs/toolkit';
import {JWT_KEY, userSlice} from './user.slice.ts';
import {saveState} from './storage.ts';
import {cartSlice} from './cart.slice.ts';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		cart: cartSlice.reducer
	}
});

store.subscribe(() => {
	saveState({jwt: store.getState().user.jwt}, JWT_KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store. dispatch;