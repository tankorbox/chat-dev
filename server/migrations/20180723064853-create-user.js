'use strict';

module.exports = {
	up: (queryInterface, DataTypes) => {
		return queryInterface.createTable('User', {
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
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			displayName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
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
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('User');
	}
};
