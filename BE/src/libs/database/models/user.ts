import { db } from '../../../libs/database/db';
import { Email } from '../../../libs/database/models/email';
import { getSalt, hashPassword, verifyPassword } from '../../../libs/hmac';
import { signJwt, verifyJwt } from '../../../libs/jwt';
import {
	Association,
	BelongsToCreateAssociationMixin,
	BelongsToGetAssociationMixin,
	BelongsToSetAssociationMixin,
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
} from 'sequelize';
import { UserJWTPayload } from '../../../../../types/User';
import { Mesurement, TYPE } from './mesurement';

export enum Role {
	ADMIN = 'admin',
	USER = 'user',
	IOT = 'iot',
}

export interface UserAttributes {
	id: number;
	name: string;
	password: string | null;
	salt: string | null;
	magic: string | null;
	role: Role;
	terms: boolean;
	emailId: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'emailId' | 'role' | 'createdAt' | 'updatedAt'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
	// Common attributes
	public id!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Specified attributes
	public name!: string;
	public password!: string | null;
	public salt!: string | null;
	public magic!: string | null;
	public role!: Role;
	public terms!: boolean;
	public emailId!: number;

	// Associations
	public static associations: {
		email: Association<User, Email>;
		mesurements: Association<User, Mesurement>;
	};

	public email?: Email;
	public getEmail!: BelongsToGetAssociationMixin<Email>;
	public setEmail!: BelongsToSetAssociationMixin<Email, number>;
	public createEmail!: BelongsToCreateAssociationMixin<Email>;

	public mesurements?: Mesurement[];
	public getMesurements!: HasManyGetAssociationsMixin<Mesurement>;
	public setMesurements!: HasManySetAssociationsMixin<Mesurement, number>;
	public addMesurement!: HasManyAddAssociationMixin<Mesurement, number>;
	public removeMesurements!: HasManyRemoveAssociationsMixin<Mesurement, number>;
	public removeMesurement!: HasManyRemoveAssociationMixin<Mesurement, number>;
	public addMesurements!: HasManyAddAssociationsMixin<Mesurement, number>;
	public hasMesurement!: HasManyHasAssociationMixin<Mesurement, number>;
	public hasMesurements!: HasManyHasAssociationsMixin<Mesurement, number>;
	public countMesurements!: HasManyCountAssociationsMixin;
	public createMesurement!: HasManyCreateAssociationMixin<Mesurement>;

	// Methods

	public getMesurementsByType(type: TYPE) {
		return this.getMesurements({ where: { type } });
	}

	public static findByEmail(email: string) {
		return User.findOne({
			where: { role: Role.USER },
			include: [{ association: User.associations.email, where: { email }, required: true }],
		});
	}

	//TOFIX: This is not working
	public static findByNameIot(name: string) {
		return User.findOne({
			where: { role: Role.IOT },
			include: [{ where: { name }, required: true }],
		});
	}

	public static findByMagic(magic: string) {
		return User.findOne({
			where: { magic },
		});
	}

	public static findWithEmail(id: number) {
		return User.findByPk(id, {
			include: [
				{
					association: User.associations.email,
					attributes: ['email'],
					required: true,
				},
			],
		});
	}

	public async getPayload(): Promise<UserJWTPayload> {
		return {
			id: this.id,
			name: this.name,
			email: this.email ? this.email.email : (await this.getEmail()).email,
			role: this.role,
		};
	}

	public async getToken(payload?: UserJWTPayload) {
		return signJwt({
			payload: payload ?? (await this.getPayload()),
			secret: this.salt || '',
		});
	}

	public verifyToken(token: string) {
		return verifyJwt({ jwt: token, secret: this.salt || '' });
	}

	public verifyPassword(password: string) {
		if (!this.salt || !this.password) return false;
		return verifyPassword({ password, salt: this.salt, hash: this.password });
	}

	public async setPassword(password: string) {
		const { hash, salt } = hashPassword({ password });
		await this.update({
			salt,
			password: hash,
			magic: null,
		});
	}

	public resetCredentials() {
		return this.update({
			magic: getSalt(),
		});
	}

	public resetPassword() {
		return this.update({
			salt: null,
			password: null,
			magic: null,
		});
	}

	public register(name: string, password: string, terms: boolean, role = Role.USER) {
		const { hash, salt } = hashPassword({ password });
		return this.update({
			name,
			salt,
			password: hash,
			magic: null,
			terms,
			role,
		});
	}

	public async changeEmail(newEmail: Email) {
		const oldEmail = await this.getEmail();
		if (oldEmail.id === newEmail.id) return;
		await this.setEmail(newEmail);
	}

	public static async findOrCreateByEmail(email: string): Promise<[User, boolean]> {
		const [emailEntity, created] = await Email.findOrCreateByEmail(email);

		if (!created) {
			const userEntity = await emailEntity.getUser();
			if (userEntity) return [userEntity, false];
		}

		const userEntity = await emailEntity.createUser();

		return [userEntity, true];
	}
}

User.init(
	{
		id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
		name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
		password: { type: DataTypes.STRING(128), allowNull: true, defaultValue: null },
		salt: { type: DataTypes.STRING(128), allowNull: true, defaultValue: null },
		magic: { type: DataTypes.STRING(128), allowNull: true, defaultValue: null },
		role: { type: DataTypes.ENUM('admin', 'user', 'iot'), allowNull: false, defaultValue: 'user' },
		terms: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		emailId: { type: DataTypes.INTEGER.UNSIGNED },
	},
	{
		sequelize: db.sequelize,
		modelName: 'user',
		indexes: [
			{
				name: 'magic',
				fields: ['magic'],
			},
		],
	},
);
