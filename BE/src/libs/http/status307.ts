import { response } from 'libs/http/response';

export const status307 = (location: string) =>
	response({
		statusCode: 307,
		message: 'Temporary Redirect',
		headers: {
			Location: location,
		},
	});
