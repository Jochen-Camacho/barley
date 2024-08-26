const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Salary extends Model {}

Salary.init(
  {
    base: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    variable: {
      type: DataTypes.INTEGER,
    },
    bonus: {
      type: DataTypes.INTEGER,
    },
    equity: {
      type: DataTypes.INTEGER,
    },
    benefits: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "salary",
  }
);

module.exports = Salary;
