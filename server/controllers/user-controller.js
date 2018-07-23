import {userRepository} from '../repositories/index';
import {Response} from '../helpers';

export default class UserController {
	getUser = async(req, res) => {
		const users = await userRepository.getAll({
			limit:10,
			page: 1
		});
		return Response.success(res, users);
	};

	putUser = async(req, res) => {

	};

	uploadAvatar = async(req, res) => {

	};

	changePassword = async(req, res) => {

	};
}