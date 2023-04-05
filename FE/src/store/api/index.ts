import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppState } from '../';
import { HYDRATE } from 'next-redux-wrapper';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

export const appApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://1fntd115qh.execute-api.eu-west-1.amazonaws.com/`,
		prepareHeaders: (headers, { getState }) => {
			const { token } = getState() as AppState;
			if (token) headers.set('authorization', `Bearer ${token}`);
			return headers;
		},
	}),
	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath];
		}
	},
	tagTypes: ['User', 'DataIoT', 'Station'],
	endpoints: () => ({}),
});
