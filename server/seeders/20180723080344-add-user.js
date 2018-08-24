'use strict';
import {userRepository} from '../repositories/index';
import Faker from 'faker';

module.exports = {
  up: async(queryInterface, Sequelize) => {
	  	// return await userRepository.create({
		 //    username: 'daivi07',
		 //    password: '12345678',
		 //    email: 'daivi123456@gmail.com',
		 //    displayName: 'Dai Vi',
	    // });
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
