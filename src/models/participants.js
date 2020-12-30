const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participants', {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'ID'
      },
      field: 'UserID'
    },
    studenthomeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'studenthome',
        key: 'ID'
      },
      field: 'StudenthomeID'
    },
    mealId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'meal',
        key: 'ID'
      },
      field: 'MealID'
    },
    signedUpOn: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'SignedUpOn'
    }
  }, {
    sequelize,
    tableName: 'participants',
    schema: 'studenthome',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "UserID" },
          { name: "StudenthomeID" },
          { name: "MealID" },
        ]
      },
      {
        name: "fk_participants_studentenhome",
        using: "BTREE",
        fields: [
          { name: "StudenthomeID" },
        ]
      },
      {
        name: "fk_participants_meal",
        using: "BTREE",
        fields: [
          { name: "MealID" },
        ]
      },
    ]
  });
};
