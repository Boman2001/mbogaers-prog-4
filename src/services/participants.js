const Participant = require('../repositories/sequalize').models.participants;
const Meal = require('../repositories/sequalize').models.meal;
const Dorm = require('../repositories/sequalize').models.studenthome;
const User = require('../repositories/sequalize').models.user;
const tokenHandler = require('../services/token')
/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {Integer} options.mealId ID of the Meal to get.
 * @param {String} options.token ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.registerParticipant = async (options) => {
  let created
  const meal = await Meal.findOne({where: {id: options.mealId}}).then();
  const dorm = await Dorm.findOne({where: {id: options.dormId}}).then();

  if (meal && dorm) {
    const participantCount = (await Participant.findAndCountAll({
      where: {
        studenthomeId: options.dormId,
        mealId: options.mealId
      }
    }).then()).count
    if (tokenHandler.validateToken(options.token)) {
      const user = await tokenHandler.returnTokenUser(options.token).user;
      let toAdd = {
        userId: user.id,
        studenthomeId: options.dormId,
        mealId: options.mealId
      };
      if (meal.maxParticipants > participantCount + 1 && Date.parse(meal.offeredOn) > Date.now()) {
        created = await Participant.create(toAdd).then();
      } else {
        if (meal.maxParticipants < participantCount + 1) {
          return {
            status: 400,
            data: {message: "Not enough room"}
          };
        } else if (Date.parse(meal.offeredOn) < Date.now()) {
          return {
            status: 400,
            data: {message: "Meal out of date"}
          };
        }

      }
    } else {
      return {
        status: 401,
        data: {message: "Unauthorized"}
      };
    }
    if (created) {
      return {
        status: 200,
        data: created.dataValues
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
      data: {message: "No meals match your query"}
    };
  }
};

/**
 * @param {Object} options
 * @param {Integer} options.dormId
 * @param {Integer} options.mealId ID of the Meal to get.
 * @param {string} options.token user token
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deregisterParticipant = async (options) => {
  const meal = Meal.findOne({where: {id: options.mealId}});
  const dorm = Dorm.findOne({where: {id: options.dormId}});
  let participant;
  let removed;
  if (tokenHandler.validateToken(options.token)) {
    const user = tokenHandler.returnTokenUser(options.token).user;
    participant = await Participant.findOne({
      where: {
        userId: user.id,
        studenthomeId: options.dormId,
        mealId: options.mealId
      },
    }).then();
    if (meal && dorm && participant) {
      removed = await Participant.destroy({
        where: {
          userId: user.id,
          studenthomeId: options.dormId,
          mealId: options.mealId
        }
      }).then();
    } else {
      return {
        status: 404,
        data: {message: "No participants match your query"}
      };
    }
    if (removed > 0) {
      return {
        status: 200,
        data: participant
      };
    } else {
      return {
        status: 400,
        data: {message: "invalid Request"}
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
 * @param {Integer} options.mealId ID of the Meal to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllParticipants = async (options) => {
  const participants = await Participant.findAll({where: {mealId: options.mealId}, include: [Meal, Dorm, User]}).then();
  if (participants.length > 0) {
    return {
      status: 200,
      data: participants
    };
  } else {
    return {
      status: 404,
      data: {error:"No participants match your query"}
    };
  }

};
