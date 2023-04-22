import { appApi } from '../api/index';
import { GetDataResponse, GetDataRequest } from '@type/DataIoT';

export const dataIoTApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getDataIot: builder.query<GetDataResponse, GetDataRequest>({
			query: ({ userId, type, startDate, endDate, granularity, granularityUnit }) => ({
				url: `/iot/data/getMany?type=${type}&userId=${userId}&startDate=${startDate}&endDate=${endDate}&granularity=${granularity}&granularityUnit=${granularityUnit}`,
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'DataIoT' }] : []),
		}),
	}),
});

export const { useGetDataIotQuery } = dataIoTApi;
