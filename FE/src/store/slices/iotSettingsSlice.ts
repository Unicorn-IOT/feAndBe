import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChartRange, iotSettings, MesurementType } from '@type/IotSettings';
import { iotApi } from '../api/iotApi';

const initialState: iotSettings = {
	selected: {
		type: 'temperature',
		range: ChartRange.ONE_MONTH,
	},
	available: {
		type: ['humidity', 'temperature'],
		range: [ChartRange.ONE_MONTH, ChartRange.THREE_MONTHS, ChartRange.ONE_YEAR],
	},
};

export const iotSettingsSlice = createSlice({
	name: 'iotSettings',
	initialState,
	reducers: {
		changeType: (state, { payload }: PayloadAction<MesurementType>) => {
			if (state.available.type.includes(payload)) {
				state.selected.type = payload;
			}
			return state;
		},
		changeRange: (state, { payload }: PayloadAction<ChartRange>) => {
			if (state.available.range.includes(payload)) {
				state.selected.range = payload;
			}
			return state;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(iotApi.endpoints.getData.matchFulfilled, (state, { payload }) => {
			return state;
		});
	},
});
