import {userGroupController} from '../controllers';

module.exports = (app, router) => {

	router.route('/userGroups/:groupId').get(userGroupController.getUserGroup)
		.post(userGroupController.postUserGroups);

};