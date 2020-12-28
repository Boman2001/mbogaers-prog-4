const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('studenthome', {
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
    Address: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    House_Nr: {
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
    Postal_Code: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    Telephone: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    City: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'studenthome',
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
        name: "fk_studenthome_user",
        using: "BTREE",
        fields: [
          { name: "UserID" },
        ]
      },
    ]
  });
};
