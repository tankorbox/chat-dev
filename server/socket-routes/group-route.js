import SocketHelper from '../helpers/socket-helper';
import {groupController, userController, userGroupController} from '../controllers';

module.exports = (socketHelper) => {
	socketHelper
		.use('/api/groups/create', groupController.createGroup)
		.use('/api/groups/update', groupController.updateGroup)
		.use('/api/groups/reset', groupController.resetGroup)
		.use('/api/groups/members/update', userGroupController.updateMemberGroup)
		.use('/api/groups/leave', userGroupController.leaveGroup);
};