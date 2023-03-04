import { HTTPRequest } from '../../../../types/http';
import { Lambda } from '../../../../types/lambda';

export let useRequest = (): HTTPRequest => {
	throw new Error('Wrap Lambda handler with `withHTTP` first.');
};

export const withHttp =
	(handler: Lambda): Lambda =>
	async (...args: Parameters<Lambda>) => {
		const [event] = args;
		const { headers, httpMethod } = event;

		useRequest = () => ({ method: httpMethod, headers });

		return handler(...args);
	};
