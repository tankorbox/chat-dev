import {messageRepository, groupRepository} from '../repositories';
import {Response} from '../helpers';

export default class MessageController {

	//from http request

	getMessages = async(req, res) => {
		const groupId = req.params.groupId;
		const user = req.user;
		const limit = req.query.limit;
		const page = req.query.page;
		const option = {
			groupId: groupId,
			userId: user.id,
			limit: limit,
			page: page
		};
		const messages = await messageRepository.getAll(option);
		return Response.success(res, messages);
	};

	create = async(req, res) => {

	};

	update = async(req, res) => {

	};

	sendTyping = async(req, res) => {

	};

	clearConversation = async(req, res) => {

	};

	deleteConversation = async(req, res) => {

	};

	sendMessages =async(req, res) => {

	};

	getLastMessages = async(req, res) => {

	};

	//======================
	//from web socket request

	sendMessage = async({socket, token, user, body}) => {
		const data = {
			data: body.message,
			userId: user.id,
			groupId: body.groupId
		};
		console.log(data);
		const result = await messageRepository.create(data);
		if (result) {
			socket.to(body.groupId).emit('messages/receive', data);
		}
	};

	updateMessage = async({socket, token, user, body}) => {
		const data = {
			data: body.message,
			userId: user.id,
			groupId: body.groupId
		};
		socket.to(body.groupId).emit('messages/update', data);
	};

	sendUserTyping = async({socket, token, user, body}) => {
		const groupId = body.groupId;
		const isTyping = body.isTyping;
		const displayName = user.dataValues.displayName;
		socket.to(groupId).emit('messages/typing', {userId: user.id, groupId, isTyping, displayName});
		return isTyping;
	};
}