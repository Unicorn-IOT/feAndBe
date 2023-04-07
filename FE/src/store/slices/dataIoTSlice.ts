import { createSlice } from '@reduxjs/toolkit';
import { measurementType } from '@type/DataIoT';

type DataIoT = {
	type: measurementType;
	userId: number; // TODO prejmenovat na iotId
	days: number; // TODO prejmenovat na range
	time: string;
};

// TODO initial data dodelat tak aby se nevyskytl error

export const dataIoTSlice = createSlice({
	name: 'dataIoT',
	initialState: { days: 90, userId: 1, type: 'temperature', time: '' } as DataIoT,
	reducers: {
		setUserId: (state, action) => {
			state.userId = action.payload;
			return state;
		},
		setType: (state, action) => {
			state.type = action.payload;
			return state;
		},
		setTime: (state, action) => {
			state.time = action.payload;
			return state;
		},
		setDays: (state, action) => {
			state.days = action.payload;
			return state;
		},
	},
});

export const { setTime, setUserId, setDays } = dataIoTSlice.actions;
