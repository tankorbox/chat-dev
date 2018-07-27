import {authController} from '../controllers';
import {Wrapper} from '../helpers';

module.exports = (app, router) => {
	router.route('/auth/login').post(Wrapper(authController.signIn));

	router.route('/auth/signup').post(Wrapper(authController.signUp));
};