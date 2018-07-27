'use strict';

const Bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true
				}
			},
			displayName: {
				type: DataTypes.STRING
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false
			},
			deletedAt: {
				type: DataTypes.DATE
			}
		},
		{
			paranoid: true,
			freezeTableName: true,
			indexes: [
				{
					fields: ['id', 'username']
				}
			],
			classMethod: {
				generateHash(password) {
					return Bcrypt
						.hash(password, 8)
						.then((data) => {
							return data;
						})
						.catch(() => {
							return false;
						})
				}
			}
		}
	);

	User.associate = (models) => {
		//
	};

	User.generateHash = async (password) => {
		return await Bcrypt.hash(password, 8);
	};

	User.prototype.comparePassword = async function (password) {
		return await Bcrypt.compare(password, this.dataValues.password);
	};

	User.beforeBulkUpdate(async function (user, options) {
		if (user.attributes.password) {
			user.attributes.password = await User.generateHash(user.attributes.password);
		}
		return user;
	});

	User.beforeSave(async function (user, options) {
		if (user.password) {
			user.password = await User.generateHash(user.password);
		}
		return user;
	});

	return User;
};