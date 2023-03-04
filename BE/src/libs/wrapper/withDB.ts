import * as Model from '../../libs/database/model';
import { Lambda } from '../../../../types/lambda';

const checkConnection = async () => {
	const { db } = Model;
	await db.sequelize.authenticate();
};

export let useDB = async (): Promise<typeof Model> => {
	throw new Error('Wrap Lambda handler with `withDB` function first.');
};

export const withDB =
	<T>(handler: Lambda<T>): Lambda<T> =>
	async (...args: Parameters<Lambda<T>>) => {
		let checked = false;

		useDB = async () => {
			if (checked) return Model;
			try {
				await checkConnection();
				checked = true;
				return Model;
			} catch (e) {
				console.log('Reconnecting to DB...');
				const { db } = Model;
				db.sequelize = db.init();

				try {
					await checkConnection();
					return Model;
				} catch (e) {
					console.log('Could not connect to DB');
					throw e;
				}
			}
		};

		return handler(...args);
	};
