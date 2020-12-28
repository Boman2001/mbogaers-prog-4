const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meal', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Ingredients: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Allergies: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    CreatedOn: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    OfferedOn: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'ID'
      }
    },
    StudenthomeID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'studenthome',
        key: 'ID'
      }
    },
    MaxParticipants: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'meal',
    schema: 'studenthome',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ID" },
        ]
      },
      {
        name: "fK_meal_user",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
      {
        name: "fk_meal_studentenhome",
        using: "BTREE",
        fields: [
          { name: "StudenthomeID" },
        ]
      },
    ]
  });
};
