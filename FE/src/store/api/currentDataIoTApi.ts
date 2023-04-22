import { appApi } from '../api/index';
import { GetCurrentDataResponse } from '../../../../types/currentDataIoT';

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
