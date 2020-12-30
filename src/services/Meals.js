const ServerError = require('../lib/error');
const Meal = require('../repositories/sequalize').models.meal;
const Dorm = require('../repositories/sequalize').models.studenthome;
const tokenHandler = require('../services/token')
/**
 * @param {Object} options
 * @param {Integer} options.id ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {Object} options.body
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createMeal = async (options) => {
  const dormDetail = await Dorm.findOne({where: {id: options.dormId}}).then();
  const user = await tokenHandler.returnTokenUser(options.token).user;
  let result;
  let toCreate = options.body;
  if (dormDetail) {
    if (dormDetail.dataValues.userId === user.id) {
      toCreate.userId = user.id;
      toCreate.studenthomeId = options.dormId;
      result = await Meal.create(toCreate).then()
    } else {
      return {
        status: 401,
        data: {message: "Unauthorized"}
      };
    }
    if (result._options.isNewRecord) {
      return {
        status: 200,
        data: result.dataValues
      };
    } else {
      return {
        status: 400,
        data: {message: "invalid Request"}
      };
    }
  } else {
    return {
      status: 404,
      data: {message: "No dormatories match your query"}
    };
  }
};

/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {String} options.token
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getMealOverview = async (options) => {
  if (tokenHandler.validateToken(options.token)) {
    const result = await Meal.findAll({where:{studenthomeId: options.dormId}}).then();
    if (result.length > 0){
      return {
        status: 200,
        data: result
      };
    }else{
      return {
        status: 404,
        data: {message: "No dormatories match your query"}
      };
    }

  } else {
    return {
      status: 401,
      data: {message: "Unauthorized"}
    };
  }
};

/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {Integer} options.mealId ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getMealDetail = async (options) => {
  const mealDetail = await Meal.findOne({where: {id: options.mealId, studenthomeId: options.dormId}}).then();
  if (mealDetail) {
    return {
      status: 200,
      data: mealDetail
    };
  } else {
    return {
      status: 404,
      data: "No dormatories match your query"
    };
  }
};

/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {Integer} options.mealId ID of the Meal to get.
 * @param {Meal} options.body ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.editMeal = async (options) => {
  const mealDetail = await Meal.findOne({where: {id: options.mealId}}).then();
  const user = await tokenHandler.returnTokenUser(options.token).user;
  let toEdit = options.body;
  let mealUpdateSuccess = 0;
  if (mealDetail) {
    if (mealDetail.dataValues.userId === user.id) {
      toEdit.userId = user.id;
      mealUpdateSuccess = await Meal.update(toEdit, {
        where: {
          id: options.mealId
        }
      });
    } else {
      return {
        status: 401,
        data: {message: "Unauthorized"}
      };
    }
    if (mealUpdateSuccess[0] > 0) {
      return {
        status: 200,
        data: toEdit
      };
    } else {
      return {
        status: 400,
        data: {message: "invalid Request"}
      };
    }
  } else {
    return {
      status: 404,
      data: {message: "No dormatories match your query"}
    };
  }
};

/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {Integer} options.mealId ID of the Meal to get.
 * @param {String} options.token ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteMeal = async (options) => {
  const mealDetail = await Meal.findOne({where: {id: options.mealId}}).then();
  const user = await tokenHandler.returnTokenUser(options.token).user;
  let dormDestroySuccess = 0;
  if (mealDetail) {
    if (mealDetail.dataValues.userId === user.id) {
      dormDestroySuccess = await Meal.destroy({where: {id: options.mealId}}).then();

    } else {
      return {
        status: 401,
        data: {message: "Unauthorized"}
      };
    }
    if (dormDestroySuccess > 0) {
      return {
        status: 200,
        data: mealDetail
      };
    }
  } else {
    return {
      status: 404,
      data: {message: "No Meals match your query"}
    };
  }
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
    data: {error:'getUserDetailFromMeal ok!'}
  };
};

