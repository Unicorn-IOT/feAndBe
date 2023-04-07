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
		id: number; // ID zaznamu
		value: number;
		type: measurementType;
		userId: number; // ID stanice
		localization: string;
	}[];
}>;

export type GetDataRequest = {
	userId: number;
	days: number;
	type: measurementType;
};
