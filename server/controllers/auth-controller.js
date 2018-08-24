import {validateEmail, validatePassword, validateUsername} from "../helpers/validate-helper";
import {ValidationError, AuthorizationError, NotFoundError} from '../errors';
import {userRepository} from '../repositories';
import Path from 'path';
import FS from 'fs';
import {JWTHelper, Response} from "../helpers";
import JWT from 'jsonwebtoken';
import HTTPStatus from 'http-status';

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

	signUp = async (req, res) => {
		const {username, password, displayName, email} = req.body;
		if (!validateUsername(username)) {
			throw new ValidationError('Username is not valid');
		}
		if (!validateEmail(email)) {
			throw new ValidationError('Email is not valid!');
		}
		if (!validatePassword(password)) {
			throw new ValidationError('Password is not valid!')
		}
		const isUserExist = await this.checkUserExist(username);
		if (isUserExist) {
			throw new ValidationError('Account is already existed!');
		}
		try {
			const user = await userRepository.create({
				username: username,
				password: password,
				displayName: displayName,
				email: email
			});
			return Response.success(res, user);
		}
		catch (e) {
			return Response.error(res, e);
		}
	};

	verifyUser = async (data) => {
		const user = await userRepository.get({
			where: {
				id: data.id
			}
		});
		if (!user) {
			return Promise.reject(new Error('USER_NOT_FOUND'));
		}
		for (const [key, value] of Object.entries(user)) {
			if (!value) {
				delete user[key];
			}
		}
		return {
			...data,
			...user
		};
	};

	isAuth = async (req, res, next) => {
		let token;

		if (req.headers && req.headers.authorization) {
			let parts = req.headers.authorization.split(' ');
			if (parts.length === 2) {
				const scheme = parts[0];
				const credentials = parts[1];
				if (/^Bearer$/i.test(scheme)) {
					token = credentials;
				}
			} else {
				next(new Error('Format is Authorization: Bearer [token]'));
				return;
			}
		} else if (req.params.token) {
			token = req.params.token;
			delete req.query.token;
		} else {
			next(new Error('No Authorization header was found'), HTTPStatus.UNAUTHORIZED);
			return;
		}

		const path = Path.resolve(__dirname, '..', 'config', 'cert', 'public.key');
		const cert = FS.readFileSync(path);
		JWT.verify(token, cert, {algorithms: ['RS256']}, async (error, payload) => {
			if (error) {
				throw new Error(error);
			}
			try {
				const user = await userRepository.get({
					where: {
						id: payload.id
					}
				});
				if (!user) {
					next(new Error('USER_NOT_FOUND'));
					return;
				}
				req.user = user;
				next();
			} catch (error) {
				next(error)
			}
		});
	};

	signOut = async(req, res) => {

	};

	checkUserExist = async (username) => {
		const isUserExist = await userRepository.get({
			where: {
				username: username
			}
		});
		return !!isUserExist;
	}
}