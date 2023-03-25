import { db } from '../../../libs/database/db';
import { User } from '../../../libs/database/models/user';
import {
	Association,
	DataTypes,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	HasManyHasAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	HasManySetAssociationsMixin,
	Model,
	Optional,
	Transaction,
} from 'sequelize';

export interface EmailAttributes {
	id: number;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export type EmailCreationAttributes = Optional<EmailAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Email extends Model<EmailAttributes, EmailCreationAttributes> implements EmailAttributes {
	// Common attributes
	public id!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Specified attributes
	public email!: string;

	// Associations
	public static associations: {
		users: Association<Email, User>;
	};

	public users?: User[];
	public getUsers!: HasManyGetAssociationsMixin<User>;
	public setUsers!: HasManySetAssociationsMixin<User, number>;
	public addUser!: HasManyAddAssociationMixin<User, number>;
	public removeUsers!: HasManyRemoveAssociationsMixin<User, number>;
	public removeUser!: HasManyRemoveAssociationMixin<User, number>;
	public addUsers!: HasManyAddAssociationsMixin<User, number>;
	public hasUser!: HasManyHasAssociationMixin<User, number>;
	public hasUsers!: HasManyHasAssociationsMixin<User, number>;
	public countUsers!: HasManyCountAssociationsMixin;
	public createUser!: HasManyCreateAssociationMixin<User>;
	// Methods
	public static findByEmail(email: string, transaction?: Transaction) {
		const lowerCaseEmail = email.toLowerCase();
		return Email.findOne({ where: { email: lowerCaseEmail }, transaction });
	}

	public static findOrCreateByEmail(email: string, transaction?: Transaction) {
		const lowerCaseEmail = email.toLowerCase();
		return Email.findOrCreate({ where: { email: lowerCaseEmail }, defaults: { email: lowerCaseEmail }, transaction });
	}

	public static findWithEmailId(id: number) {
		return User.findOne({
			where: { id },
		});
	}
}

Email.init(
	{
		id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
	},
	{
		sequelize: db.sequelize,
		modelName: 'email',
		indexes: [
			{
				name: 'email',
				fields: ['email'],
				unique: true,
			},
		],
	},
);
