const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('studenthome', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'Name'
    },
    address: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'Address'
    },
    houseNr: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'House_Nr'
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'ID'
      },
      field: 'UserID'
    },
    postalCode: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'Postal_Code'
    },
    telephone: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'Telephone'
    },
    city: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'City'
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
