import { status200 } from '../../libs/http/status200';
import { status500 } from '../../libs/http/status500';
import { withDB } from '../../libs/wrapper/withDB';
import { withHttp } from '../../libs/wrapper/withHttp';
import { createDatabase } from '../../scripts/createDatabase';
import { Lambda, ScriptParameters } from '../../../../types/lambda';

const scripts: Record<string, (parameters: ScriptParameters) => Promise<string | string[] | void>> = {
	createDatabase,
};

export const handler: Lambda = withHttp(
	withDB(async ({ pathParameters, queryStringParameters }) => {
		const { name } = pathParameters || {};
		if (!name) return { statusCode: 400, body: 'Missing required parameter script.' };
		if (!scripts[name]) return { statusCode: 404, body: 'Script not found.' };
		try {
			const response = await scripts[name]({ queryStringParameters });
			return status200({ data: typeof response === 'undefined' ? '' : response });
		} catch (e) {
			console.error(e);
			return status500();
		}
	}),
);
