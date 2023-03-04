export const isOffline = false;

export const localDB = false;

export const db = {
	host: isOffline ? 'localhost' : 'fdb1029.awardspace.net',
	database: '4273731_iot',
	user: isOffline && localDB ? 'root' : '4273731_iot',
	password: isOffline && localDB ? 'admin' : 'zuUBUAv@6i]IB0uU',
	port: 3306,
};
