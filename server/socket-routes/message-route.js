import {groupController, userController, userGroupController, messageController} from '../controllers';

module.exports = (socketHelper) => {
	socketHelper
		.use('/api/messages/create', messageController.sendMessage)
		.use('/api/messages/update', messageController.updateMessage)
		.use('/api/messages/typing', messageController.sendUserTyping);
};