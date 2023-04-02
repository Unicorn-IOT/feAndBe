import { appApi } from '../api/index';
import { GetDataResponse, GetDataRequest } from '@type/DataIoT';

export const dataIoTApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getDataIot: builder.query<GetDataResponse, GetDataRequest>({
			query: ({ userId, days, type }) => ({
				url: `/iot/getMany?type=${type}&userId=${userId}&days=${days}`,
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'DataIoT' }] : []),
		}),
	}),
});

export const { useGetDataIotQuery } = dataIoTApi;
