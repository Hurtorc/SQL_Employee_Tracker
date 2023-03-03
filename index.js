const { prompt } = require("inquirer");
const db = require("./db/connection");

// IMPORTING ALL THE FUNCTIONS FROM THE OTHER FILES
const {
  viewDepartments,
  addDepartment,
  deleteDepartment,
} = require("./db/departments");

const { viewAllRoles, addRole, deleteRole } = require("./db/roles");

const {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
} = require("./db/employee");

// Function to display main menu
function promptMainMenu() {
  prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      pagesize: 15,
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Exit",
      ],
    },
  ]).then((answers) => {
    switch (answers.mainMenu) {
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployeeRole();
        break;
      case "Delete a department":
        deleteDepartment();
        break;
      case "Delete a role":
        deleteRole();
        break;
      case "Delete an employee":
        deleteEmployee();
        break;
      case "Exit":
        db.end();
        break;
    }
  });
}

// Call the promptMainMenu function to start the application
promptMainMenu();
