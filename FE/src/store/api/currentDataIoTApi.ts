import { appApi } from '../api/index';
import { GetCurrentDataResponse } from '@type/CurrentDataIoT';

export const currentDataIoTApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentDataIoT: builder.query<GetCurrentDataResponse, void>({
			query: () => ({
				url: '/iot/data/get',
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'CurrentDataIoT' }] : []),
		}),
	}),
});

export const { useGetCurrentDataIoTQuery } = currentDataIoTApi;
