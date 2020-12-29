const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'ID'
    },
    firstName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'First_Name'
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'Last_Name'
    },
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'Email'
    },
    studentNumber: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'Student_Number'
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      field: 'Password'
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
