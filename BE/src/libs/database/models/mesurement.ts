import { db } from '../../../libs/database/db';
import {
	Association,
	BelongsToCreateAssociationMixin,
	BelongsToGetAssociationMixin,
	BelongsToSetAssociationMixin,
	DataTypes,
	Model,
	Op,
	Optional,
} from 'sequelize';
import { User } from './user';

export enum TYPE {
	TEMPERATURE = 'temperature',
	HUMIDITY = 'humidity',
}

export type MesurementAttributes = {
	id?: number;
	value: number;
	type: TYPE;
	userId: number; //String of sensor from IoT (sensor)
	location: string;
	date: Date;
	createdAt?: Date;
	updatedAt?: Date;
};

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
	public location!: string;
	public date!: Date;

	// Associations
	public static associations: {
		users: Association<Mesurement, User>;
	};

	public user?: User;
	public getUser!: BelongsToGetAssociationMixin<User>;
	public setUser!: BelongsToSetAssociationMixin<User, number>;
	public createUser!: BelongsToCreateAssociationMixin<User>;

	// Methods
	public static async findBetweenDates(limitDate: Date, type: TYPE[], userId: number) {
		const measurementData = await this.findAll({
			where: {
				date: {
					[Op.gte]: limitDate,
				},
				userId,
				type: {
					[Op.in]: type,
				},
			},
			order: [['date', 'DESC']],
		});

		return measurementData;
	}
}

Mesurement.init(
	{
		id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		value: { type: DataTypes.INTEGER, allowNull: false },
		type: { type: DataTypes.ENUM('temperature', 'humidity'), allowNull: false },
		userId: { type: DataTypes.INTEGER.UNSIGNED },
		location: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Unknown' },
		date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
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
