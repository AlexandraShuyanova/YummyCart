import {createSlice} from '@reduxjs/toolkit';

export interface UserState {
    jwt: null | string;
}

const initialState : UserState  = {
	jwt: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addJwt: (state) => {
			state.jwt = 'aaaa';
		},
		logout: (state) => {
			state.jwt = null;
		}
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
