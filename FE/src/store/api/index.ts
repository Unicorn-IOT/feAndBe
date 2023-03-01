import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AppState } from '../';
import { HYDRATE } from 'next-redux-wrapper';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

export const appApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		prepareHeaders: (headers, { getState }) => {
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
	tagTypes: [],
	endpoints: () => ({}),
});
