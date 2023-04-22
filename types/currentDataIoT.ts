import { ApiResponse } from './Api';

export type GetCurrentDataResponse = ApiResponse<{
	location: string;
	temperature: number;
	humidity: number;
}>;
