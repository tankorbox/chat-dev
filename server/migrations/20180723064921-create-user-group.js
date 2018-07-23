'use strict';

module.exports = {
	up: (queryInterface, DataTypes) => {
		return queryInterface.createTable('UserGroup', {
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true
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
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'UserGroup',
					key: 'id',
					allowNull: false,
					onDelete: 'CASCADE'
				}
			},
			memberName: {
				type: DataTypes.STRING
			},
			groupName: {
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
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('UserGroup');
	}
};
