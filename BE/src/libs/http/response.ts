import { APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { compress as compressGzip, supports as supportsGzip } from 'libs/gzip';
import { useRequest } from 'libs/wrapper/withHttp';
import { Headers, HTTPRequest, ResponseProps } from '../../../../types/http';

export const response = ({ statusCode, message, data, headers, cache }: ResponseProps): APIGatewayProxyResult => {
	let request: HTTPRequest;
	try {
		request = useRequest();
	} catch (e) {
		request = { headers: {}, method: 'GET' };
	}

	const requestHeaders = Object.keys(request.headers).reduce((acc: Record<string, string>, key) => {
		const value = request.headers[key];
		if (value) {
			acc[key.toLowerCase()] = value;
		}
		return acc;
	}, {});

	const responseHeaders: Headers = {
		'Content-Type': 'application/json; charset=utf-8',
		Vary: 'Accept-Encoding, Authorization, Cookie',
		'X-Clacks-Overhead': 'GNU Terry Pratchett',
		...headers,
	};

	const acceptEncoding = requestHeaders['accept-encoding'];
	let content = JSON.stringify({ statusCode, message, data });

	if (supportsGzip(acceptEncoding)) {
		content = compressGzip(content);
		responseHeaders['Content-Encoding'] = 'gzip';
	}

	const cacheControl = requestHeaders['cache-control'];
	if ((cacheControl && ~cacheControl.indexOf('no-cache')) || !cache) {
		responseHeaders['Cache-Control'] = 'no-cache, no-store, max-age=0';
	} else {
		responseHeaders['Cache-Control'] = `public, max-age=${Math.floor(cache / 1000)}`;
	}
	responseHeaders['CDN-Cache-Control'] = responseHeaders['Cache-Control'];

	return {
		statusCode,
		headers: responseHeaders,
		body: content,
		isBase64Encoded: !!responseHeaders['Content-Encoding'],
	};
};
