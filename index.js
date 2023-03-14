const { prompt, default: inquirer } = require("inquirer");
const db = require("./db/connection");

//IMPORTING ALL THE FUNCTIONS FROM THE OTHER FILES
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
const promptMainMenu = async () => {
  const { mainmenu } = await prompt([
    {
      type: "list",
      name: "mainmenu",
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
  switch (mainmenu) {
    case "View all departments":
      const departments = await viewDepartments();
      console.table(departments);
      break;
    case "View all roles":
      const roles = await viewAllRoles();
      console.table(roles);
      break;
    case "View all employees":
      const employees = await viewAllEmployees();
      console.table(employees);
      break;
    case "Add a department":
      const newDepartment = await addDepartment();
      console.table(newDepartment);
      break;
    case "Add a role":
      const newRole = await addRole();
      console.table(newRole);
      break;
    case "Add an employee":
      const newEmployee = await addEmployee();
      console.table(newEmployee);
      break;
    case "Update an employee role":
      const employeeToUpdate = await updateEmployeeRole();
      console.table(employeeToUpdate);
      break;
    case "Delete a department":
      const deletedDepartment = await deleteDepartment();
      console.table(deletedDepartment);
      break;
    case "Delete a role":
      const deletedRole = await deleteRole();
      console.table(deletedRole);
      break;
    case "Delete an employee":
      const deletedEmployee = await deleteEmployee();
      console.table(deletedEmployee);
      break;
    case "Exit":
      process.exit();
  }
  promptMainMenu(false);
};

// Call the promptMainMenu function to start the application
promptMainMenu(true);
