/**local*/
//LOCAL Setup
// export const isOffline = false;
// export const localDB = false;

// export const db = {
// 	host: isOffline ? 'localhost' : '127.0.0.1',
// 	database: 'test',
// 	user: isOffline && localDB ? 'root' : 'root',
// 	password: isOffline && localDB ? '' : '',
// 	port: 3306,
// };

/*CLOUD Setting*/
export const isOffline = true;

export const db = {
	host: 'unicorniot.cd98mbmqu8a5.eu-west-1.rds.amazonaws.com',
	database: 'unicorniot',
	user: 'admin',
	password: 'rootroot',
	port: 3306,
};
