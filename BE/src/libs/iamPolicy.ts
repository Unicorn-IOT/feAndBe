import { APIGatewayAuthorizerResultContext } from 'aws-lambda/common/api-gateway';

const generatePolicy = (methodArn: string, principalId: string, effect: string, context?: APIGatewayAuthorizerResultContext) => ({
	principalId,
	context,
	policyDocument: {
		Version: '2012-10-17',
		Statement: [
			{
				Action: 'execute-api:Invoke',
				Effect: effect,
				Resource: methodArn,
			},
		],
	},
});

export const deny = (methodArn: string) => generatePolicy(methodArn, 'Unauthorized', 'Deny');

export const allow = (methodArn: string, principalId: string, context: APIGatewayAuthorizerResultContext) =>
	generatePolicy(methodArn, principalId, 'Allow', context);
