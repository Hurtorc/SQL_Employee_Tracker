const { prompt } = require("inquirer");
const db = require("./connection");

//function to view all employees
async function viewAllEmployees() {
  try {
    const employees = await db.query(
      `SELECT * FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN departments ON roles.departments_id = departments.id`
    );
    return employees;
  } catch (err) {
    console.log(err);
  }
}

//function to add an employee
async function addEmployee() {
  try {
    const roles = await db.query(`SELECT * FROM roles`);
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    const employees = await db.query(`SELECT * FROM employees`);
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    employeeChoices.unshift({ name: "None", value: null });
    const employee = await prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the employee's last name:",
      },
      {
        type: "list",
        name: "roles_id",
        message: "Choose the employee's role:",
        choices: roleChoices,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Choose the employee's manager:",
        choices: employeeChoices,
      },
    ]);
    await db.query(`INSERT INTO employees SET ?`, employee);
    console.log(
      `Added ${employee.first_name} ${employee.last_name} to the database`
    );
  } catch (err) {
    console.log(err);
  }
}

//function to update an employee's role
async function updateEmployeeRole() {
  try {
    const employees = await db.query(`SELECT * FROM employees`);
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    const roles = await db.query(`SELECT * FROM roles`);
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    const { employeesId, rolesId } = await prompt([
      {
        type: "list",
        name: "employees_id",
        message: "Choose the employee to update:",
        choices: employeeChoices,
      },
      {
        type: "list",
        name: "roles_id",
        message: "Choose the employee's new role:",
        choices: roleChoices,
      },
    ]);
    db.query(`UPDATE employees SET roles_id = ? WHERE id = ?`, [
      rolesId,
      employeesId,
    ]);
    console.log(`Updated employee's role`);
  } catch (err) {
    console.log(err);
  }
}

//function to delete an employee
async function deleteEmployee() {
  try {
    const employees = await db.query(`SELECT * FROM employees`);
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employees_id",
        message: "Choose the employee to delete:",
        choices: employeeChoices,
      },
    ]);
    await db.query(`DELETE FROM employees WHERE id = ?`, employeeId);
    console.log(`Deleted employee from the database`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
};
