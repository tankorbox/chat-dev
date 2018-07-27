import {groupRepository, userGroupRepository} from '../repositories';
import {Response} from '../helpers';
import {Group} from '../models/index';
import {Op} from '../models';
import Moment from 'moment';

export default class GroupController {

	getGroups = async(req,res) => {
		const limit = req.query.limit;
		const page = req.query.page;
		const date = req.query.date;
		const groups = await groupRepository.getAll({
			limit: limit,
			page: page
		});
		return Response.success(res, groups);
	};

	postGroups = async(req, res) => {
		const {userId, type, name} = req.body;
		const result = await groupRepository.create({
			userId: userId,
			type: type,
			name: name
		});
		return Response.success(res, result);
	};

	putGroup = async(req, res) => {

	};

	deleteGroup = async(req, res) => {

	};


	createGroup = async ({socket, token, user, body}) => {
		if (typeof body.type === 'undefined') {
			return Promise.reject(new Error('MISSING_GROUP_TYPE'));
		}
		switch (body.type) {
			case Group.Types.PRIVATE:
				return await this.createIndividualConversation({socket, token, user, body});
			case Group.Types.CHATBOT:
				//TODO
			case Group.Types.GROUP:
				return await this.createGroupConversation({socket, token, user, body});
			default:
				return Promise.reject(new Error('MISSING_GROUP_TYPE'));
		}
	};

	createGroupConversation = async ({socket, token, user, body}) => {
		if (!body.name) {
			return Promise.reject(new Error('MISSING_GROUP_NAME'));
		}
		const authorId = user.id;
		const userIds = body.userIds;
		if (userIds && userIds.length < 2) {
			return Promise.reject(new Error('INVALID_GROUP_MEMBER'));
		}
		const group = await groupRepository.create({
			authorId: authorId,
			name: body.name,
			type: Group.Types.GROUP
		});
		if (userIds.indexOf(authorId) === -1) {
			userIds.push(authorId);
		}
		const members = userIds.map(userId => {
			return {
				groupId: group.id,
				userId: userId
			};
		});
		await userGroupRepository.bulkCreate(members);
		return group;
	};
}