import { ApiResponse } from './Api';

export enum measurementType {
	TEMPERATURE = 'temperature',
	HUMIDITY = 'humidity',
}

export type DataIoT = {
	temperature: string;
	humidity: string;
	type: measurementType;
};

export type GetDataResponse = ApiResponse<{
	temperatureData: {
		id: number;
		value: number;
		type: measurementType;
		userId: number;
		localization: string;
	}[];
}>;

export type GetDataRequest = {
	userId: number;
	days: number;
	type: measurementType;
};
