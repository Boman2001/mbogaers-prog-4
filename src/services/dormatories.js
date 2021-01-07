const ServerError = require('../lib/error').ServerError;
const Dorm = require('../repositories/sequalize').models.studenthome;
const User = require('../repositories/sequalize').models.user;
const Inhabitant = require('../repositories/sequalize').models.inhabitants;
const tokenHandler = require('../services/token')

/**
 * @param {Object} options
 * @param {String} options.body the body of the new dorm
 * @param {String} options.token the bearer token
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createDorm = async (options) => {
  if (await tokenHandler.validateToken(options.token)) {
    if (!validatePostal(options.body.postalCode)) {
      return {
        status: 400,
        data: ServerError({
          "name": "Validation Error",
          "errors": [
            {
              "message": "postalCode Should be valid dutch postal code",
            }
          ]
        })
      };
    } else if (!validatePhone(options.body.telephone)) {
      return {
        status: 400,
        data: ServerError({
          "name": "Validation Error",
          "errors": [
            {
              "message": "Phonenumber should be a valid dutch phone number",
            }
          ]
        })
      };
    } else {
      try {
        const user = await tokenHandler.returnTokenUser(options.token).user;
        const toCreate = options.body;
        toCreate.userId = user.id;
        const result = await Dorm.create(toCreate).then();
        let returnVal = result.dataValues;
        return {
          status: 200,
          data: returnVal
        };
      } catch (e) {
        return {
          status: 400,
          data: ServerError(e)
        };
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
    };
  }

};
/**
 * @param {Object} options
 * @param {String} options.name name of dormatory
 * @param {String} options.city place of dormatory
 * @param {Integer} options.limit The amount of dorms to get
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllDorm = async (options) => {
  let dormatories;

  if (options.name && options.city) {
    dormatories = Dorm.findAll({where: {name: options.name, city: options.city}});
  } else if (options.name) {
    dormatories = Dorm.findAll({where: {name: options.name}});
  } else if (options.city) {
    dormatories = Dorm.findAll({where: {city: options.city}});
  } else {
    dormatories = Dorm.findAll();
  }
  const result = await dormatories.then();
  if (options.limit) {
    result.length = options.limit
    return {
      status: 200,
      data: result
    };
  } else {
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
              "message": {
                "message": "No results match your query cant find",
                "query": options,
              }
            }
          ]
        })
      };
    }

  }


};

/**
 * @param {Object} options
 * @param {Integer} options.id ID of the Dorm to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getDormDetail = async (options) => {

  const dormDetail = await Dorm.findOne({where: {id: options.id}}).then();
  if (dormDetail) {
    return {
      status: 200,
      data: dormDetail
    };
  } else {
    return {
      status: 404,
      data: ServerError({
        "name": "Search Error",
        "errors": [
          {
            "message": "No results match your query cant find",
          }
        ]
      })
    };
  }

};

/**
 * @param {Object} options
 * @param {Integer} options.id The ID of the Dorm.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deleteDorm = async (options) => {
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
  }else {
    const dormDetail = await Dorm.findOne({where: {id: options.id}}).then();
    const user = await tokenHandler.returnTokenUser(options.token).user;
    let dormDestroySuccess = 0;
    if (dormDetail) {
      if (dormDetail.dataValues.userId === user.id) {
        try {
          dormDestroySuccess = await Dorm.destroy({where: {id: options.id}}).then();
        } catch (e) {
          return {
            status: 400,
            data: ServerError({e})
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
        };
      }
      if (dormDestroySuccess > 0) {
        return {
          status: 200,
          data: dormDetail
        };
      }
    } else {
      return {
        status: 404,
        data: ServerError({
          "name": "Search Error",
          "errors": [
            {
              "message": "No results match your query cant find",
            }
          ]
        })
      };
    }
  }
};

/**
 * @param {Object} options
 * @param {Integer} options.id The ID of the Dorm.
 * @param {Object} options.body
 * @throws {Error}
 * @return {Promise}
 */
module.exports.editDorm = async (options) => {
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
  }else{
    const dormDetail = await Dorm.findOne({where: {id: options.id}}).then();
    const user = await tokenHandler.returnTokenUser(options.token).user;
    let toEdit = options.body;
    let dormUpdateSuccess = 0;
    if (toEdit.hasOwnProperty("name") && toEdit.hasOwnProperty("address") && toEdit.hasOwnProperty("houseNr") && toEdit.hasOwnProperty("postalCode") && toEdit.hasOwnProperty("city") && toEdit.hasOwnProperty("telephone")) {
      if (!validatePostal(options.body.postalCode)) {
        return {
          status: 400,
          data: ServerError({
            "name": "Validation Error",
            "errors": [
              {
                "message": "postalCode Should be valid dutch postal code",
              }
            ]
          })
        };
      } else if (!validatePhone(options.body.telephone)) {
        return {
          status: 400,
          data: ServerError({
            "name": "Validation Error",
            "errors": [
              {
                "message": "Phonenumber should be a valid dutch phone number",
              }
            ]
          })
        };
      } else {
        if (dormDetail) {
          try {
            if (dormDetail.dataValues.userId === user.id) {
              toEdit.userId = user.id;
              dormUpdateSuccess = await Dorm.update(toEdit, {
                where: {
                  id: options.id
                }
              });
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
              };
            }
            if (dormUpdateSuccess[0] > 0) {
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
          } catch (e) {
            return {
              status: 400,
              data: ServerError(e)
            };
          }

        } else {
          return {
            status: 404,
            data: ServerError({
              "name": "Search Error",
              "errors": [
                {
                  "message": "No dormatories match your query"
                }
              ],
            })
          };
        }
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
      };
    }
  }
}

/**
 * @param {Object} options
 * @param {Integer} options.id name of dormatory
 * @param {Object} options.body
 * @throws {Error}
 * @return {Promise}
 */
module.exports.registerToDorm = async (options) => {
  const dormDetail = await Dorm.findOne({where: {id: options.id}}).then();
  const user = await tokenHandler.returnTokenUser(options.token).user;
  const userToRegister = await User.findOne({where: {id: options.body.id}})
  let result;
  if (dormDetail && userToRegister) {
    if (dormDetail.dataValues.userId === user.id) {
      const toCreate = {
        userId: userToRegister.dataValues.id,
        studenthomeId: dormDetail.dataValues.id,
      };
      result = await Inhabitant.findOrCreate({where: toCreate}).then();

    } else {
      return {
        status: 401,
        data: {message: "Unauthorized"}
      };
    }
    console.log(result[0].dataValues);
    if (result[0]) {
      return {
        status: 200,
        data: result[0].dataValues
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
      data: {message: "No dormatories or users match your query"}
    };
  }
};

function validatePhone(input) {
  const regex = /^((\+|00)?31|0(?!0))(\d{9})$/;
  return regex.test(input)
}

function validatePostal(email) {
  let re = /^\d{4} ?[a-z]{2}$/i;
  return re.test(email);
}

