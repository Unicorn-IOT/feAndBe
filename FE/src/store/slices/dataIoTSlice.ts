import { createSlice } from '@reduxjs/toolkit';
import { measurementType } from '@type/DataIoT';

type DataIoT = {
	type: measurementType;
	userId: number;
	startDate: Date;
	endDate: Date;
	granularity: number;
	granularityUnit: string;
};

export const dataIoTSlice = createSlice({
	name: 'dataIoT',
	initialState: {
		type: 'temperature',
		userId: 1,
		startDate: new Date('2023-04-02T17:25:41.000Z'),
		endDate: new Date('2023-04-05T17:25:41.000Z'),
		granularity: 5,
		granularityUnit: 'hours',
	} as DataIoT,
	reducers: {
		setUserId: (state, action) => {
			state.userId = action.payload;
			return state;
		},
		setType: (state, action) => {
			state.type = action.payload;
			return state;
		},
		setStartDate: (state, action) => {
			state.startDate = action.payload;
			return state;
		},
		setEndDate: (state, action) => {
			state.endDate = action.payload;
			return state;
		},
		setGranularity: (state, action) => {
			state.granularity = action.payload;
			return state;
		},
		setGranularityUnit: (state, action) => {
			state.granularityUnit = action.payload;
			return state;
		},
	},
});

export const { setUserId, setType, setStartDate, setEndDate, setGranularity, setGranularityUnit } = dataIoTSlice.actions;
