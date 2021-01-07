const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inhabitants', {
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
    signedUpOn: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('current_timestamp'),
      field: 'SignedUpOn'
    }
  }, {
    sequelize,
    tableName: 'inhabitants',
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
        ]
      },
      {
        name: "fk_inhabitants_studentenhome",
        using: "BTREE",
        fields: [
          { name: "StudenthomeID" },
        ]
      },
    ]
  });
};
