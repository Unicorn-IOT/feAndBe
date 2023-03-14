//LOCAL Setup
export const isOffline = false;

export const localDB = true;

export const db = {
	host: isOffline ? 'localhost' : '127.0.0.1',
	database: 'test',
	user: isOffline && localDB ? 'root' : 'root',
	password: isOffline && localDB ? '' : '',
	port: 3306,
};

/*----------------Cloud Setup----------------------*/

// export const isOffline = false;

// export const localDB = false;

// export const db = {
// 	host: isOffline ? 'localhost' : '212.237.39.159',
// 	database: 'w20hxd056y',
// 	user: isOffline && localDB ? 'root' : 'm6gb7d3z5v',
// 	password: isOffline && localDB ? 'admin' : 'zuUBUAv@6i]IB0uU',
// 	port: 3306,
// };
