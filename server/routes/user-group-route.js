import {userGroupController} from '../controllers';

module.exports = (app, router) => {

	router.route('/userGroups').get(userGroupController.getUserGroup)
		.post(userGroupController.postUserGroups);

};