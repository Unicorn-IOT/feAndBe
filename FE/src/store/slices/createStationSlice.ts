import { createSlice } from '@reduxjs/toolkit';

type Station = {
	name: string;
	password: string;
};

export const createStationSlice = createSlice({
	name: 'createStation',
	initialState: {
		name: 'UnicornStation',
		password: 'hafikyHaf',
	} as Station,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
			return state;
		},
		setPassword: (state, action) => {
			state.password = action.payload;
			return state;
		},
	},
});

export const { setName, setPassword } = createStationSlice.actions;
