import {userController} from '../controllers/index';


module.exports = (app, router) => {
	router.route('/users').get(userController.getUser)
		.put(userController.putUser);

	router.route('/changePassword')
		.put(userController.changePassword);

	router.route('/uploadAvatar')
		.post(userController.uploadAvatar);
};