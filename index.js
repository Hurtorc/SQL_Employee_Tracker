const { prompt } = require("inquirer");
const db = require("./db/connection");

// IMPORTING ALL THE FUNCTIONS FROM THE OTHER FILES
// const {
//   viewDepartments,
//   addDepartment,
//   deleteDepartment,
// } = require("./db/departments");

const { viewAllRoles, addRole, deleteRole } = require("./db/roles");

// const {
//   viewAllEmployees,
//   addEmployee,
//   updateEmployeeRole,
//   deleteEmployee,
// } = require("./db/employee");

// Function to display main menu
const promptMainMenu = async () => {
  const { mainmenu } = await prompt([
    {
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",

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
    ]);
    console.log(mainmenu); // This is the value of the choice the user made
    switch (mainmenu) {
      case "View all departments":
        data = viewDepartments();
        console.table(data);
        break;
      case "View all roles":
        data = viewAllRoles();
        break;
      case "View all employees":
        data = viewAllEmployees();
        break;
      case "Add a department":
        data = addDepartment();
        break;
      case "Add a role":
        data = addRole();
        break;
      case "Add an employee":
        data = addEmployee();
        break;
      case "Update an employee role":
        data = updateEmployeeRole();
        break;
      case "Delete a department":
        data = deleteDepartment();
        break;
      case "Delete a role":
        data = deleteRole();
        break;
      case "Delete an employee":
        data = deleteEmployee();
        break;
    }
    promptMainMenu(false);
  };

// Call the promptMainMenu function to start the application
promptMainMenu();
