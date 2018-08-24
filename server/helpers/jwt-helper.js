'use strict';

import JWT from 'jsonwebtoken';
import {config} from '../config';
import {jwtCredentials} from '../config';

export default class JWTHelper {

	static  getToken(req) {
		let authorization = null;
		let token = null;
		if (req.query && req.query.token) {
			return req.query.token;
		} else if (req.authorization) {
			authorization = req.authorization;
		} else if (req.headers) {
			authorization = req.headers.authorization;
		} else if (req.socket) {
			if (req.socket.handshake.query && req.socket.handshake.query.token) {
				return req.socket.handshake.query.token;
			}
			authorization = req.socket.handshake.headers.authorization;
		} else if (req.token) {
			authorization = req.token;
		}
		if (authorization) {
			const parts = authorization.split(' ');
			if (parts.length === 2) {
				const scheme = parts[0];
				if (/^Bearer$/i.test(scheme)) {
					token = parts[1];
				}
			}
		}
		return token;
	}

	static async verify(token, option) {
		option = Object.assign({
			algorithms: 'RS256'
		}, option);
		return await JWT.verify(token, jwtCredentials.publicKey, option);
	}

	static async sign(data, cert) {
		const expired_in = config.TOKEN_EXPIRE_TIME || 1234567;
		const token = JWT.sign({
				id: data.id,
				role: data.role
			},
			cert,
			{
				algorithm: 'RS256',
				expiresIn: expired_in
			});
		return {
			access_token: token,
			expire_in: expired_in,
			id : data.id
		};
	}

}