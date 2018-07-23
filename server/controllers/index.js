

import AuthController from "./auth-controller";
import GroupController from "./group-controller";
import MessageController from "./message-controller";
import UserController from "./user-controller";
import UserGroupController from "./user-group-controller";

module.exports = {
	authController: new AuthController(),
	groupController: new GroupController(),
	messageController: new MessageController(),
	userController: new UserController(),
	userGroupController: new UserGroupController()
};