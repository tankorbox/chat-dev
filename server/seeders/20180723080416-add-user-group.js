'use strict';
import {userRepository, userGroupRepository} from '../repositories';
import {Op} from '../models';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    // const users = await userRepository.getAll({
	 //    where: {
	 //    	username: {
	 //    		[Op.like]: '%daivi%'
		//     }
	 //    }
    // });
    // console.log(users);
    // for (let i = 0; i < users.length; i++) {
    // 	await userGroupRepository.create({
		//     groupId:'740c8d27-4c66-479c-bb60-3780bed0f346',
		//     userId: users[i].dataValues.id
	 //    })
    // }
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
