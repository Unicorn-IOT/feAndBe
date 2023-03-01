import { useDB } from 'libs/wrapper/withDB';

export const createDatabase = async () => {
	const { db } = await useDB();
	await db.sequelize.sync({ alter: true });
};
