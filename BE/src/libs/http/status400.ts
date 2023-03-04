import { response } from '../../libs/http/response';
import { StatusProps } from '../../../../types/http';

export const status400 = (props?: StatusProps) => {
	const { message, ...rest } = props ?? {};
	return response({
		statusCode: 400,
		message: message ?? 'Bad Request',
		...rest,
	});
};
