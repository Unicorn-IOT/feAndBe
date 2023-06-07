import { ApiResponse } from './Api';

export type GetCurrentDataResponse = ApiResponse<{
	location: string;
	temperature: string;
	humidity: string;
	dateTemp: string;
	dataHum: string;
	name: string;
}>;

export type GetCurrentDataRequest = {
	userId: number;
};
