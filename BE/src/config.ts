export const isOffline = false;

export const localDB = false;

export const db = {
	host: isOffline ? 'localhost' : 'unicorniot.cd98mbmqu8a5.eu-west-1.rds.amazonaws.com',
	database: 'unicorniot',
	user: isOffline && localDB ? 'root' : 'admin',
	password: isOffline && localDB ? 'admin' : 'rootroot',
	port: 3306,
};
