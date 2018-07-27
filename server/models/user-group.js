'use strict';

module.exports = (sequelize, DataTypes) => {
	const UserGroup = sequelize.define('UserGroup',
		{
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
					model: 'User',
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
		},
		{
			paranoid: true,
			freezeTableName: true
		}
	);

	UserGroup.associate = (models) => {
		//
	};

	return UserGroup;
};