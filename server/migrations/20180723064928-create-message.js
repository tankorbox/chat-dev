'use strict';

module.exports = {
	up: (queryInterface, DataTypes) => {
		return queryInterface.createTable('Message', {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
					allowNull: false,
					onDelete: 'CASCADE'
				}
			},
			groupId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'Group',
					key: 'id',
					allowNull: false,
					onDelete: 'CASCADE'
				}
			},
			data: {
				type: DataTypes.JSON,
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
		return queryInterface.dropTable('Message');
	}
};
