const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participants', {
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'ID'
      }
    },
    StudenthomeID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'studenthome',
        key: 'ID'
      }
    },
    MealID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'meal',
        key: 'ID'
      }
    },
    SignedUpOn: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
