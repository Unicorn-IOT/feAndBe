import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
	email: string;
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: { email: '' } as AuthState,
	reducers: {
		setEmail: (state, { payload }: PayloadAction<string>) => ({ ...state, email: payload }),
	},
});
