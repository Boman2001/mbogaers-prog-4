const ServerError = require('../lib/error');
const jwt = require("jsonwebtoken");
const user = require("../repositories/sequalize").models.user;
const bcrypt = require('bcrypt')
/**
 * @param {Object} options
 * @param {Object} options.body
 * @throws {Error}
 * @return {Promise}
 */
module.exports.loginUser = async (options) => {
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
    data: 'loginUser ok!'
  };
};

module.exports.registerUser = async (options) => {
  const checkuser = await user.findOne({email: options.body.email}).exec();
  if (!checkuser) {
    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(options.body.password, salt,);

    let createUser = {
      First_Name:  options.body.First_Name,
      Last_Name:  options.body.Last_Name,
      Email: options.body.Email,
      Student_Number: options.body.Student_Number,
      Password: password
    }
    const result = await user.create(createUser);
    return {
      status: 200,
      data: {token: jwt.sign({user: result}, secret, {}), result: result}
    };
  } else {
    return {
      status: 422,
      data: "User Already Registerd"
    }
  }
};
