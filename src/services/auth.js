const ServerError = require('../lib/error');
const user = require("../repositories/sequalize").models.user;
const bcrypt = require('bcrypt')
const tokenHandler = require('../services/token')
/**
 * @param {Object} options
 * @param {Object} options.body
 * @throws {Error}
 * @return {Promise}
 */
module.exports.loginUser = async (options) => {
  const checkUser = await user.findOne({where:{email: options.body.email}}).then();
  console.log(checkUser);
  if (checkUser) {
    const result = bcrypt.compareSync(options.body.password, checkUser.password)
    if (result) {
      delete checkUser.dataValues.password;
      return {
        status: 200,
        data: {token: tokenHandler.signToken(checkUser.dataValues),result: checkUser }
      };
    } else {
      return {
        status: 422,
        data: {message:"wrong password"}
      }
    }
  } else {
    return {
      status: 422,
      data: {message:"No User Found"}
    }
  }
};

module.exports.registerUser = async (options) => {

  let salt = bcrypt.genSaltSync(10);
  let password = bcrypt.hashSync(options.body.password, salt,);

  let createUser = {
    firstName: options.body.firstName,
    lastName: options.body.lastName,
    email: options.body.email,
    studentNumber: options.body.studentNumber,
    password: password
  }
  try{
    const result = await user.create(createUser).then();
    let returnVal = result.dataValues;
    delete returnVal.password;
    console.info(returnVal);
    return {
      status: 200,
      data: {token: tokenHandler.signToken(returnVal), result: returnVal}
    };

  }catch (e){
    return {
      status: 406,
      data: e
    };
  }
}
