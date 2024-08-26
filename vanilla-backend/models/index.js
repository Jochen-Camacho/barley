const Department = require("./Department");
const Employee = require("./Employee");
const Job = require("./Job");
const Location = require("./Location");
const PayBand = require("./PayBand");
const Salary = require("./Salary");

Department.hasMany(Job, { foreignKey: "departmentId" });
Job.belongsTo(Department, { foreignKey: "departmentId" });

Location.hasMany(Employee, { foreignKey: "locationId" });
Employee.belongsTo(Location, { foreignKey: "locationId" });

Salary.hasOne(Employee, { foreignKey: "salaryId" });
Employee.belongsTo(Salary, { foreignKey: "salaryId" });

PayBand.belongsTo(Department, { foreignKey: "jobFunctionId" });
PayBand.belongsTo(Job, { foreignKey: "jobId" });
PayBand.hasMany(Employee, { foreignKey: "payBandId" });
Employee.belongsTo(PayBand, { foreignKey: "payBandId" });

Job.hasMany(Employee, { foreignKey: "jobId" });
Employee.belongsTo(Job, { foreignKey: "jobId" });

Department.sync({ alter: true });
Job.sync({ alter: true });
Location.sync({ alter: true });
PayBand.sync({ alter: true });
Salary.sync({ alter: true });
Employee.sync({ alter: true });

module.exports = { Department, Job, Location, Salary, Employee, PayBand };
