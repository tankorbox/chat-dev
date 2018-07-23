'use strict';

import JWT from 'jsonwebtoken';
import {config} from '../config'

export default class JWTHelper {

	static async verify(key, token) {
		return new Promise((fulfill, reject) => {
			JWT.verify(
				token,
				key,
				{
					algorithm: 'RS256'
				},
				(error, decoded) => {
					if (error) {
						reject(error);
					} else {
						fulfill(decoded);
					}
				}
			)
		});
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
			accessToken: token,
			expire_in: expired_in
		};
	}

}