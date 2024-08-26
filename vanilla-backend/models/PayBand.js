const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class PayBand extends Model {}

PayBand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobFunctionId: {
      type: DataTypes.INTEGER,
      references: {
        model: "departments",
        key: "id",
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      references: {
        model: "jobs",
        key: "id",
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "payband",
  }
);

module.exports = PayBand;
