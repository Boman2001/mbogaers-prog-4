const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "balls";

module.exports.returnTokenUser = (token) => {
  try{
    const decoded = jwt.verify(token, secret)
    if (decoded) {
      return decoded
    } else {
      return {
        _id: "syke"
      }
    }
  }catch (e) {
    return {
      _id: "syke"
    }
  }

};

module.exports.validateToken = (token) => {
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      if (decoded) {
        return true;
      }
    } catch (e) {
      return false;
    }

  } else {
    return false;
  }
}

module.exports.signToken = (user) => {
  return jwt.sign({user: user}, secret, {expiresIn: "5h"})
}
