import {userRepository} from '../repositories/index';
import {Response} from '../helpers';
import {Op, User} from '../models';
import ValidationError from "../errors/validation-error";

export default class UserController {
	getUserInfo = async(req, res) => {
		const userId = req.user.id;
		const user = await userRepository.get({
			where: {
				id: userId
			}
		});
		return Response.success(res, user);
	};

	searchUsers = async(req, res) => {
		const searchData = req.query('displayName');
		const options = {
			where: {
				displayName: {
					[Op.like]: `%${searchData}%`
				}
			}
		};
		const users = await userRepository.getAll(options);
		return Response.success(res, users);
	};

	putUser = async(req, res) => {

	};

	uploadAvatar = async(req, res) => {

	};

	changePassword = async(req, res) => {
		const {oldPassword, newPassword} = req.body;
		const user = userRepository.get({
			where: {
				id: req.user.id,
				password: User.generateHash(oldPassword)
			}
		});
		if (!user) {
			throw new ValidationError('WRONG_OLD_PASSWORD')
		} else {
			const result = await userRepository.update({
				password: newPassword
			}, {
				where: {
					id: req.user.id
				}
			});
			return Response.success(res, result);
		}
	};
}