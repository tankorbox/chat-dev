

import {validateEmail} from "../helpers/validate-helper";
import {ValidationError, AuthorizationError, NotFoundError} from '../errors';
import {userRepository} from '../repositories';
import Path from 'path';
import FS from 'fs';
import {JWTHelper, Response} from "../helpers";

export default class AuthController {

	signIn = async(req, res) => {
		const {username, password} = req.body;
		const user = await userRepository.get({
			attributes: ['id', 'username', 'password'],
			where: {
				username: username
			},
		});
		if (!user) {
			throw new NotFoundError('User not found!');
		} else {
			const isValidPassword = await user.comparePassword(password);
			if (!isValidPassword) {
				throw new AuthorizationError('Wrong password');
			}
			else {
				const path = Path.resolve(__dirname, '..', 'config', 'cert', 'private.key');
				const cert = FS.readFileSync(path);
				const data = {
					id: user.id
				};
				const result =  await JWTHelper.sign(data, cert);
				return Response.success(res, result);
			}
		}
	};

	signUp = async(req, res) => {

	};

	signOut = async(req, res) => {

	}
}