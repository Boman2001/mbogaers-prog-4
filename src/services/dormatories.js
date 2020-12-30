const ServerError = require('../lib/error');
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
    const user = await tokenHandler.returnTokenUser(options.token).user;
    const toCreate = options.body;
    toCreate.userId = user.id;
    const result = await Dorm.create(toCreate).then();
    let returnVal = result.dataValues;
    console.log(returnVal);

    return {
      status: 200,
      data: returnVal
    };
  } else {
    return {
      status: 401,
      data: {message: 'Unauthorized'}
    };
  }

};
/**
 * @param {Object} options
 * @param {String} options.name name of dormatory
 * @param {String} options.city place of dormatory
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
  if (result.length > 0) {
    return {
      status: 200,
      data: result
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
      data: {error:"No dormatories match your query"}
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
  const dormDetail = await Dorm.findOne({where: {id: options.id}}).then();
  const user = await tokenHandler.returnTokenUser(options.token).user;
  let dormDestroySuccess = 0;
  if (dormDetail) {
    if (dormDetail.dataValues.userId === user.id) {
      dormDestroySuccess = await Dorm.destroy({where: {id: options.id}}).then();

    } else {
      return {
        status: 401,
        data: {message: "Unauthorized"}
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
      data: {message: "No dormatories match your query"}
    };
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
  const dormDetail = await Dorm.findOne({where: {id: options.id}}).then();
  const user = await tokenHandler.returnTokenUser(options.token).user;
  let toEdit = options.body;
  let dormUpdateSuccess = 0;
  if (dormDetail) {
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
        data: {message: "Unauthorized"}
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
  } else {
    return {
      status: 404,
      data: {message: "No dormatories match your query"}
    };
  }
};

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




