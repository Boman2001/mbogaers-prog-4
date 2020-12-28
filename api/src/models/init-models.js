var DataTypes = require("sequelize").DataTypes;
var _meal = require("./meal");
var _participants = require("./participants");
var _studenthome = require("./studenthome");
var _user = require("./user");

function initModels(sequelize) {
  var meal = _meal(sequelize, DataTypes);
  var participants = _participants(sequelize, DataTypes);
  var studenthome = _studenthome(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  studenthome.belongsToMany(user, { through: participants, foreignKey: "StudenthomeID", otherKey: "UserID" });
  user.belongsToMany(studenthome, { through: participants, foreignKey: "UserID", otherKey: "StudenthomeID" });
  user.belongsToMany(meal, { through: participants, foreignKey: "UserID", otherKey: "MealID" });
  meal.belongsTo(user, { foreignKey: "UserID"});
  user.hasMany(meal, { foreignKey: "UserID"});
  meal.belongsTo(studenthome, { foreignKey: "StudenthomeID"});
  studenthome.hasMany(meal, { foreignKey: "StudenthomeID"});
  participants.belongsTo(user, { foreignKey: "UserID"});
  user.hasMany(participants, { foreignKey: "UserID"});
  participants.belongsTo(studenthome, { foreignKey: "StudenthomeID"});
  studenthome.hasMany(participants, { foreignKey: "StudenthomeID"});
  participants.belongsTo(meal, { foreignKey: "MealID"});
  meal.hasMany(participants, { foreignKey: "MealID"});
  studenthome.belongsTo(user, { foreignKey: "UserID"});
  user.hasMany(studenthome, { foreignKey: "UserID"});

  return {
    meal,
    participants,
    studenthome,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
