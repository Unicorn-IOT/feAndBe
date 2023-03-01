import {
	APIGatewayAuthorizerResult,
	APIGatewayProxyEvent,
	APIGatewayProxyEventQueryStringParameters,
	APIGatewayProxyResult,
	Context,
	DynamoDBStreamEvent,
	S3Event as AWSS3Event,
	SNSEvent as AWSSNSEvent,
	SQSEvent as AWSSQSEvent,
} from 'aws-lambda';

export type HTTPEvent = APIGatewayProxyEvent;
export type SNSEvent = AWSSNSEvent;
export type SQSEvent = AWSSQSEvent;
export type S3Event = AWSS3Event;
export type DDBEvent = DynamoDBStreamEvent;

export type Lambda<T = HTTPEvent> = (event: T, context: Context) => Promise<APIGatewayProxyResult | APIGatewayAuthorizerResult | void>;

export interface ScriptParameters {
	queryStringParameters: APIGatewayProxyEventQueryStringParameters | null;
}

export type RequestAuthorizerEvent = {
	version: '2.0';
	type: 'REQUEST';
	routeArn: string;
	identitySource: string[];
	routeKey: string;
	rawPath: string;
	rawQueryString: string;
	headers: Record<string, string>;
};
