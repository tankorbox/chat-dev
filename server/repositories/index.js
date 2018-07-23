

import GroupRepository from "./group-repository";
import MessageRepository from "./message-repository";
import UserGroupRepository from "./user-group-repository";
import UserRepository from "./user-repository";

module.exports = {
	groupRepository: new GroupRepository(),
	messageRepository: new MessageRepository(),
	userGroupRepository: new UserGroupRepository(),
	userRepository: new UserRepository()
};