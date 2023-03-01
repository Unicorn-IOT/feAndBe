import { APIGatewayProxyEventHeaders } from 'aws-lambda';

type Data = string | string[] | Record<string, unknown>;

export type Headers = Record<string, string>;

export type ResponseProps = StatusProps & {
	statusCode: number;
	message: string;
};

export type StatusProps = {
	message?: string;
	data?: Data;
	headers?: Headers;
	cache?: number;
};

export type HTTPRequest = {
	method: string;
	headers: APIGatewayProxyEventHeaders;
};
