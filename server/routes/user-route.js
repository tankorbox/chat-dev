import {userController, authController} from '../controllers/index';

module.exports = (app, router) => {
	router.route('/users').get([authController.isAuth], userController.getUserInfo)
		.put(userController.putUser);

	router.route('/users/search')
		.get(userController.searchUsers);

	router.route('/users/changePassword')
		.put(userController.changePassword);

	router.route('/users/uploadAvatar')
		.post(userController.uploadAvatar);
};