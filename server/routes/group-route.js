import {groupController} from '../controllers';
import {Wrapper} from '../helpers';

module.exports = (app, router) => {
	router.route('/groups')
		.get(Wrapper(groupController.getGroups))
		.post(Wrapper(groupController.postGroups));
};