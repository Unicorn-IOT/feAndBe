import { appApi } from '../api/index';
import { GetCurrentDataRequest, GetCurrentDataResponse } from '../../../../types/currentDataIoT';

export const currentDataIoTApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentDataIoT: builder.query<GetCurrentDataResponse, GetCurrentDataRequest>({
			query: ({ userId }) => ({
				url: `/iot/data/get?userId=${userId}`,
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'CurrentDataIoT' }] : []),
		}),
	}),
});

export const { useGetCurrentDataIoTQuery } = currentDataIoTApi;
