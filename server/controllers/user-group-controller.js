import {userGroupRepository} from '../repositories';
import {Response} from '../helpers';

export default class UserGroupController {
	getUserGroup = async(req, res) => {
		const limit = req.query.limit;
		const page = req.query.page;
		const userGroups = await userGroupRepository.getAll({
			limit: limit,
			page: page
		});
		return Response.success(res, userGroups);
	};

	postUserGroups = async(req, res) => {
		const {userId, groupId, memberName, groupName} = req.body;
		const result = await userGroupRepository.create({
			userId: userId,
			groupId: groupId,
			memberName: memberName,
			groupName: groupName
		});
		return Response.success(res, result);
	};

	putUserGroup = async(req, res) => {

	};

	deleteUserGroup = async(req, res) => {

	};

	changeGroupName = async(req, res) => {

	};

	changeMemberName = async(req, res) => {

	}
}