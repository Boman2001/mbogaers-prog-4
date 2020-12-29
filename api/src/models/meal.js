const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meal', {
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
    description: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'Description'
    },
    ingredients: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'Ingredients'
    },
    allergies: {
      type: DataTypes.STRING(32),
      allowNull: false,
      field: 'Allergies'
    },
    createdOn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'CreatedOn'
    },
    offeredOn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'OfferedOn'
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'Price'
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
    studenthomeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'studenthome',
        key: 'ID'
      },
      field: 'StudenthomeID'
    },
    maxParticipants: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'MaxParticipants'
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
