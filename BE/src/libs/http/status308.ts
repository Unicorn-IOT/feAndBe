import { response } from 'libs/http/response';

export const status308 = (location: string) =>
	response({
		statusCode: 308,
		message: 'Permanent Redirect',
		headers: {
			Location: location,
		},
	});
