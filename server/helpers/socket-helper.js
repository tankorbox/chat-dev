'use strict';

import {authController} from '../controllers/index';
import JWTHelper from './jwt-helper';
import Logger from './log-helper';
import {userRepository, messageRepository, groupRepository, userGroupRepository} from '../repositories';

const Method = {
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete'
};

export default class SocketHelper {

	constructor() {
		this.router = {};
	}

	connect = async (socket) => {
		console.log('on connect');
		const token = await JWTHelper.getToken({socket});
		const payload = await JWTHelper.verify(token, {ignoreExpiration: true});
		const user = await authController.verifyUser(payload);
		this.initializeEvent(socket);
		await this.initializeConnection(socket, user);
	};

	use = (eventName, func) => {
		this.router[eventName] = func;
		return this;
	};

	onDisconnect = (socket) => {
		console.log('disconnect');
		socket.on('disconnect', async () => {
			try {
				await this.disconnect(socket);
			} catch (e) {
				Logger.error(e);
			}
		});
	};

	executeAction = async (socket, {url, data, authorization}) => {
		const token = JWTHelper.getToken(authorization);
		const userPayload = await JWTHelper.verify(token);
		const user = await authController.verifyUser(userPayload);
		const func = this.router[url];
		if (!func) {
			return Promise.reject(`${url} is not found`);
		}
		return await func({socket: socket, token: token, user: Object.assign(userPayload, user), body: data});
	};

	initializeEvent = (socket) => {
		socket.on(Method.GET, (payload, callback) => {
			this.handleEvent(socket, payload, callback);
		});
		socket.on(Method.POST, (payload, callback) => {
			this.handleEvent(socket, payload, callback);
		});
		socket.on(Method.PUT, (payload, callback) => {
			this.handleEvent(socket, payload, callback);
		});
		socket.on(Method.DELETE, (payload, callback) => {
			this.handleEvent(socket, payload, callback);
		});
	};

	initializeConnection = async (socket, user) => {
		const groupIds = await userGroupRepository.getAll({
			attributes: ['groupId'],
			where: {
				userId: user.id
			}
		});
		if (groupIds.length === 0) {
			Logger.info('Socket warning! Have no group be joined.');
		} else {
			for (const item of groupIds) {
				console.log(item.groupId);
				socket.join(item.groupId);
			}
		}
	};

	disconnect = async (socket) => {
		console.log('disconnect');
	};

	handleEvent = async (socket, payload, callback) => {
		try {
			console.log(payload);
			payload = JSON.parse(payload);
			const data = await this.executeAction(socket, payload);
			console.log('sent');
			callback(null, data);
		} catch (e) {
			Logger.error(e);
			if (typeof e === 'string') {
				callback(e);
			} else {
				if (e.message) {
					callback(e.message);
				} else {
					callback('Error is not determine');
				}
			}
		}
	};

}

