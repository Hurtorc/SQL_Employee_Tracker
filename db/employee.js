const { prompt } = require("inquirer");
const db = require("./connection");

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
};
