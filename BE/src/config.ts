export const isOffline = false;

export const localDB = false;

export const db = {
	host: isOffline ? 'localhost' : '212.237.39.159',
	database: 'w20hxd056y',
	user: isOffline && localDB ? 'root' : 'm6gb7d3z5v',
	password: isOffline && localDB ? 'admin' : 'zuUBUAv@6i]IB0uU',
	port: 3306,
};
