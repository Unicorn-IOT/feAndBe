import { response } from '../../libs/http/response';
import { StatusProps } from '../../../../types/http';

export const status404 = (props?: StatusProps) => {
	const { message, ...rest } = props ?? {};
	return response({
		statusCode: 404,
		message: message ?? 'Not Found',
		...rest,
	});
};
