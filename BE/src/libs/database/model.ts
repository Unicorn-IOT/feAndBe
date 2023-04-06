import { db } from '../../libs/database/db';
import { Email } from '../../libs/database/models/email';
import { User } from '../../libs/database/models/user';
import { Mesurement } from './models/mesurement';

// User has one e-mail
User.belongsTo(Email, { onDelete: 'CASCADE' });
Email.hasMany(User); // gets `emailId` column

// Mesurement has one user, user has many mesurements
Mesurement.belongsTo(User);
User.hasMany(Mesurement);

export { Email, User, Mesurement, db };
