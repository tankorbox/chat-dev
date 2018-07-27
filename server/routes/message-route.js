import {messageController} from '../controllers';

module.exports = (app, router) => {
	router.route('/messages/:groupId').get(messageController.get);
	router.route('/messages').post(messageController.create);
	router.route('/messages/multiple').post(messageController.sendMessages);
	router.route('/lastMessages').get(messageController.getLastMessages);
	router.route('/messages/:id').put(messageController.update);
	router.route('/messages/:groupId/typing/:state').put(messageController.sendTyping);
	router.route('/messages/:groupId/clear').delete(messageController.clearConversation);
	router.route('/messages/:groupId/conversation').delete(messageController.deleteConversation);
};