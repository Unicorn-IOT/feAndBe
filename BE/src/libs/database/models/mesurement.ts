import { db } from 'libs/database/db';
import {
	Association,
	BelongsToCreateAssociationMixin,
	BelongsToGetAssociationMixin,
	BelongsToSetAssociationMixin,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { User } from './user';

export enum TYPE {
	TEMPERATURE = 'temperature',
	HUMIDITY = 'humidity',
}

export interface MesurementAttributes {
	id?: number;
	value: number;
	type: TYPE;
	userId: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export type MesurementCreationAttributes = Optional<MesurementAttributes, 'id' | 'createdAt' | 'updatedAt'>;

export class Mesurement extends Model<MesurementAttributes, MesurementCreationAttributes> implements MesurementAttributes {
	// Common attributes
	public id!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Specified attributes
	public value!: number;
	public type!: TYPE;
	public userId!: number;

	// Associations
	public static associations: {
		users: Association<Mesurement, User>;
	};

	public user?: User;
	public getUser!: BelongsToGetAssociationMixin<User>;
	public setUser!: BelongsToSetAssociationMixin<User, number>;
	public createUser!: BelongsToCreateAssociationMixin<User>;

	// Methods
}

Mesurement.init(
	{
		id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		value: { type: DataTypes.NUMBER, allowNull: false },
		type: { type: DataTypes.ENUM('temperature', 'humidity'), allowNull: false },
		userId: { type: DataTypes.NUMBER, allowNull: false },
	},
	{
		sequelize: db.sequelize,
		modelName: 'mesurement',
		indexes: [
			{
				name: 'type',
				fields: ['type'],
			},
			{
				name: 'userId',
				fields: ['userId', 'type'],
			},
		],
	},
);
