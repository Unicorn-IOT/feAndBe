//LOCAL Setup
export const isOffline = true;

export const localDB = true;

export const db = {
	host: isOffline ? 'localhost' : '127.0.0.1',
	database: 'test',
	user: isOffline && localDB ? ' root' : 'root',
	password: isOffline && localDB ? '' : '',
	port: 3306,
};
