'use strict';
import {userRepository} from '../repositories/index';
import Faker from 'faker';

module.exports = {
  up: async(queryInterface, Sequelize) => {
	  	return await userRepository.create({
		    username: 'tankorbox',
		    password: '12345678',
		    email: 'tankorboxdsfdsf@gmail.com',
		    displayName: 'Hoang Linh Tan',
	    });
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
