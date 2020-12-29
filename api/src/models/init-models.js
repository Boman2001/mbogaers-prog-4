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

  studenthome.belongsToMany(user, { through: participants, foreignKey: "studenthomeId", otherKey: "userId" });
  user.belongsToMany(studenthome, { through: participants, foreignKey: "userId", otherKey: "studenthomeId" });
  user.belongsToMany(meal, { through: participants, foreignKey: "userId", otherKey: "mealId" });
  meal.belongsTo(user, { foreignKey: "userId"});
  user.hasMany(meal, { foreignKey: "userId"});
  meal.belongsTo(studenthome, { foreignKey: "studenthomeId"});
  studenthome.hasMany(meal, { foreignKey: "studenthomeId"});
  participants.belongsTo(user, { foreignKey: "userId"});
  user.hasMany(participants, { foreignKey: "userId"});
  participants.belongsTo(studenthome, { foreignKey: "studenthomeId"});
  studenthome.hasMany(participants, { foreignKey: "studenthomeId"});
  participants.belongsTo(meal, { foreignKey: "mealId"});
  meal.hasMany(participants, { foreignKey: "mealId"});
  studenthome.belongsTo(user, { foreignKey: "userId"});
  user.hasMany(studenthome, { foreignKey: "userId"});

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
