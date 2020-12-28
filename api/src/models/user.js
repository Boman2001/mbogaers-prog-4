const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    First_Name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Last_Name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Student_Number: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    Password: {
      type: DataTypes.CHAR(64),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
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
    ]
  });
};
