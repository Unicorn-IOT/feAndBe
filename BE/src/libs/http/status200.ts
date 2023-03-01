import { response } from 'libs/http/response';
import { StatusProps } from '../../../../types/http';

export const status200 = (props?: StatusProps) => {
	const { message, ...rest } = props ?? {};
	return response({
		statusCode: 200,
		message: message ?? 'OK',
		...rest,
	});
};
