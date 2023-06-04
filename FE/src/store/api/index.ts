import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppState } from 'FE/src/store';
import { HYDRATE } from 'next-redux-wrapper';
// import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

export const appApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://1fntd115qh.execute-api.eu-west-1.amazonaws.com/`,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		prepareHeaders: (headers, { getState: getState }) => {
			const { token } = getState() as AppState;
			if (token) headers.set('Authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}
	},
	tagTypes: ['User', 'DataIoT', 'Station', 'CurrentDataIoT'],
	endpoints: () => ({}),
});
