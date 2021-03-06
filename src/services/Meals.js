const ServerError = require('../lib/error').ServerError;
const Meal = require('../repositories/sequalize').models.meal;
const Dorm = require('../repositories/sequalize').models.studenthome;
const User = require('../repositories/sequalize').models.user;
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
  if (!tokenHandler.validateToken(options.token)) {
    return {
      status: 401,
      data: ServerError({
        "name": "Authorization Error",
        "errors": [
          {
            "message": "Not Logged In",
          }
        ]
      })
    }
  } else {
    const dormDetail = await Dorm.findOne({where: {id: options.dormId}}).then();

    const user = await tokenHandler.returnTokenUser(options.token).user;
    let result;
    let toCreate = options.body;
    if (dormDetail) {
      if (dormDetail.dataValues.userId === user.id) {
        toCreate.userId = user.id;
        toCreate.studenthomeId = options.dormId;
        try {
          result = await Meal.create(toCreate).then()
        } catch (e) {
          return {
            status: 400,
            data: ServerError(e)
          }
        }
      } else {
        return {
          status: 401,
          data: ServerError({
            "name": "Authorization Error",
            "errors": [
              {
                "message": "Not Logged In",
              }
            ]
          })
        }
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
  }
}

/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {String} options.token
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getMealOverview = async (options) => {
  if (tokenHandler.validateToken(options.token)) {
    const result = await Meal.findAll({where: {studenthomeId: options.dormId}}).then();
    if (result.length > 0) {
      return {
        status: 200,
        data: result
      };
    } else {
      return {
        status: 404,
        data: ServerError({
          "name": "Search Error",
          "errors": [
            {
              "message": "No Meals match your query"
            }
          ],
        })
      };
    }

  } else {
    return {
      status: 401,
      data: ServerError({
        "name": "Authorization Error",
        "errors": [
          {
            "message": "Not Logged In",
          }
        ]
      })
    }
  }
}


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
      data: ServerError({
        "name": "Search Error",
        "errors": [
          {
            "message": "No Meals match your query"
          }
        ],
      })
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
  if (tokenHandler.validateToken(options.token)) {
    let toEdit = options.body;
    if (toEdit.hasOwnProperty("name") && toEdit.hasOwnProperty("description") && toEdit.hasOwnProperty("served") && toEdit.hasOwnProperty("price") && toEdit.hasOwnProperty("allergies") && toEdit.hasOwnProperty("ingredients") && toEdit.hasOwnProperty("maxParticipants") && toEdit.hasOwnProperty("offeredOn")) {
      const mealDetail = await Meal.findOne({where: {id: options.mealId}}).then();
      const user = await tokenHandler.returnTokenUser(options.token).user;
      let mealUpdateSuccess = 0;
      if (mealDetail) {
        if (mealDetail.dataValues.userId === user.id) {
          toEdit.userId = user.id;
          try {
            mealUpdateSuccess = await Meal.update(toEdit, {
              where: {
                id: options.mealId
              }
            });
          } catch (e) {
            return {
              status: 400,
              data: ServerError(e)
            }
          }

        } else {
          return {
            status: 401,
            data: ServerError({
              "name": "Authorization Error",
              "errors": [
                {
                  "message": "Not te owner of the data",
                }
              ]
            })
          }
        }
        if (mealUpdateSuccess[0] > 0) {
          return {
            status: 200,
            data: toEdit
          };
        }
      } else {
        return {
          status: 404,
          data: ServerError({
            "name": "Search Error",
            "errors": [
              {
                "message": "No Meals match your query"
              }
            ],
          })
        };
      }
    } else {
      return {
        status: 400,
        data: ServerError({
          "name": "SequelizeValidationError",
          "errors": [
            {
              "message": "invalid object"
            }
          ],
        })
      }
    }
  } else {
    return {
      status: 401,
      data: ServerError({
        "name": "Authorization Error",
        "errors": [
          {
            "message": "Not Logged In",
          }
        ]
      })
    }
  }
}
;

/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {Integer} options.mealId ID of the Meal to get.
 * @param {String} options.token ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteMeal = async (options) => {
  if (!tokenHandler.validateToken(options.token)) {
    return {
      status: 401,
      data: ServerError({
        "name": "Authorization Error",
        "errors": [
          {
            "message": "Not Logged In",
          }
        ]
      })
    }
  } else {
    const mealDetail = await Meal.findOne({where: {id: options.mealId}}).then();
    const user = await tokenHandler.returnTokenUser(options.token).user;
    let dormDestroySuccess = 0;
    if (mealDetail) {
      if (mealDetail.dataValues.userId === user.id) {
        dormDestroySuccess = await Meal.destroy({where: {id: options.mealId}}).then();
      } else {
        return {
          status: 401,
          data: ServerError({
            "name": "Authorization Error",
            "errors": [
              {
                "message": "Not Logged In",
              }
            ]
          })
        }
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
        data: ServerError({
          "name": "Search Error",
          "errors": [
            {
              "message": "No Meals match your query"
            }
          ],
        })
      };
    }
  }
}
;

/**
 * @param {Object} options
 * @param {Integer} options.mealId ID of the User to get.
 * @param {Integer} options.participantId ID of the User to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getUserDetailFromMeal = async (options) => {
  if (!tokenHandler.validateToken(options.token)) {
    return {
      status: 401,
      data: ServerError({
        "name": "Authorization Error",
        "errors": [
          {
            "message": "Not Logged In",
          }
        ]
      })
    }
  } else {
    const mealDetail = await User.findOne({where: {id: options.participantId}}).then();
    if (mealDetail) {
      mealDetail.password = undefined;
      return {
        status: 200,
        data: mealDetail
      };
    } else {
      return {
        status: 404,
        data: ServerError({
          "name": "Search Error",
          "errors": [
            {
              "message": "No Participants match your query"
            }
          ],
        })
      };
    }
  }
};

