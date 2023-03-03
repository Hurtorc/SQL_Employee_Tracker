const { prompt } = require("inquirer");
const db = require("./connection");

//exporting the functions

module.exports = { viewDepartments, addDepartment, deleteDepartment };
