const ServerError = require('../lib/error');
/**
 * @param {Object} options
 * @param {Integer} options.id ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getMealDetail = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getMealDetail ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.mealId ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllParticipants = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getAllParticipants ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.mealId ID of the User to get.
 * @param {Integer} options.participantId ID of the User to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getUserDetailFromMeal = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getUserDetailFromMeal ok!'
  };
};

