'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Workflows', [
      {
        name: "SAO Default Workflow",
        created_on: new Date(),
        modified_on: new Date()
      },
      {
        name: "BEdrock Workflow",
        created_on: new Date(),
        modified_on: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
