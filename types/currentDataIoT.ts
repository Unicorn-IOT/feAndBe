import { ApiResponse } from './Api';

export type GetCurrentDataResponse = ApiResponse<{
	data: {
		location: string;
		temperature: number;
		humidity: number;
	};
}>;
