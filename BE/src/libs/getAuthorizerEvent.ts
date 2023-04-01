import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { isOffline } from '../config';
import { RequestAuthorizerEvent } from '../../../types/lambda';

const isRequest = (_event: RequestAuthorizerEvent | APIGatewayTokenAuthorizerEvent): _event is RequestAuthorizerEvent => isOffline;

export const getAuthorizerEvent = (event: RequestAuthorizerEvent | APIGatewayTokenAuthorizerEvent) => {
	if (isRequest(event)) return { arn: event.routeArn, authorizationToken: event.identitySource[0] };

	return { arn: event.methodArn, authorizationToken: event.authorizationToken };
};
