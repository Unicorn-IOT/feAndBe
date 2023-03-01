export const isOffline = process.env.IS_OFFLINE;

export const localDB = true;

export const db = {
	host: isOffline ? 'localhost' : 'XXXX',
	database: 'iot',
	user: isOffline && localDB ? 'root' : 'XXX',
	password: isOffline && localDB ? 'admin' : 'xxx',
	port: isOffline ? (localDB ? 3306 : 3307) : 3306,
};
