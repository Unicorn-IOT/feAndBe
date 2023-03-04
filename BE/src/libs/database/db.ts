import * as config from '../../config';
import { isOffline } from '../../config';
import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

const init = () =>
	new Sequelize(config.db.database, config.db.user, config.db.password, {
		host: config.db.host,
		dialect: 'mysql',
		dialectModule: mysql,
		port: config.db.port,
		logging: isOffline ? false : (sql, timing) => console.log(new Date().toISOString(), sql, timing),
		benchmark: !isOffline,
		// logging: false,
		pool: {
			acquire: isOffline ? 300_000 : 10_000,
			idle: isOffline ? 300_000 : 10_000,
			max: isOffline ? 1000 : 10,
			min: 0,
		},
		define: {
			charset: 'utf8mb4',
			collate: 'utf8mb4_czech_ci',
			freezeTableName: true,
		},
	});

export const db = {
	init,
	sequelize: init(),
};
