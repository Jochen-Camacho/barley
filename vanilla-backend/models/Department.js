const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

// Department model
class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "department",
  }
);

module.exports = Department;
