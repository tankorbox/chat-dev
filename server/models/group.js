'use strict';

const Types = {
	PRIVATE: 'private',
	GROUP: 'group',
	CHATBOT: 'chatbot'
};
module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define('Group',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true
			},
			userId: {
				type: DataTypes.UUID,
				references: {
					model: 'User',
					key: 'id',
					allowNull: false,
					onDelete: 'CASCADE'
				}
			},
			type: {
				type: DataTypes.ENUM(Object.values(Types)),
				allowNull: false
			},
			name: {
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
		},
		{
			paranoid: true,
			freezeTableName: true
		}
	);

	Group.associate = (models) => {
		//
	};

	return Group;
};