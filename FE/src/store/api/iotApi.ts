import { GetUserResponse, UpdateUserRequest, UpdateUserResponse } from '@type/User';
import { appApi } from '.';
import { ChartRange, MesurementType } from '@type/IotSettings';

export const iotApi = appApi.injectEndpoints({
	endpoints: (builder) => ({
		getData: builder.query<GetUserResponse, { range: ChartRange; type: MesurementType }>({
			query: () => ({
				url: '/iot',
				method: 'GET',
			}),
			providesTags: (result) => (result ? [{ type: 'IoT', id: 'IOT' }] : []),
		}),
	}),
});

export const { useGetDataQuery } = iotApi;
