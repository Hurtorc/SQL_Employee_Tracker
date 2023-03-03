const { prompt } = require("inquirer");
const db = require("./db/connection");

// Function to view all employees
function viewAllEmployees() {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log("EMPLOYEES");
    console.log("---------");
    rows.forEach((row) => {
      console.log(
        `${row.id} | ${row.first_name} ${row.last_name} | ${row.title} | ${row.department} | ${row.salary} | ${row.manager}`
      );
    });
    promptMainMenu();
  });
}

// Function to add an employee
function addEmployee() {
  const sql = `SELECT roles.id, roles.title, departments.name FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    prompt([
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
        name: "role",
        message: "Choose the employee's role:",
        choices: rows.map((row) => ({ name: row.title, value: row.id })),
      },
      {
        type: "list",
        name: "manager",
        message: "Choose the employee's manager:",
        choices: [
          { name: "None", value: null },
          ...rows
            .filter((row) => row.title.toLowerCase().includes("manager"))
            .map((row) => ({
              name: `${row.title} (${row.name})`,
              value: row.id,
            })),
        ],
      },
    ]).then((answers) => {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [
        answers.first_name,
        answers.last_name,
        answers.role,
        answers.manager,
      ];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(`${result.affectedRows} employee added!\n`);
        promptMainMenu();
      });
    });
  });
}

// Function to update an employee's role
function updateEmployeeRole() {
  const sql = `SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS name, roles.title, departments.name AS department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    prompt([
      {
        type: "list",
        name: "employee",
        message: "Choose the employee to update:",
        choices: rows.map((row) => ({ name: row.name, value: row.id })),
      },
      {
        type: "list",
        name: "role",
        message: "Choose the employee's new role:",
        choices: rows
          .filter(
            (row) =>
              row.department === rows.find((r) => r.id === row.id).department
          ) // Only display roles that belong to the same department as the employee's current role
          .map((row) => ({ name: row.title, value: row.id })),
      },
    ]).then((answers) => {
      const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
      const params = [answers.role, answers.employee];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(`${result.affectedRows} employee updated!\n`);
        promptMainMenu();
      });
    });
  });
}

// Function to delete an employee
function deleteEmployee() {
  const sql = `SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS name FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    prompt([
      {
        type: "list",
        name: "employee",
        message: "Choose the employee to delete:",
        choices: rows.map((row) => ({ name: row.name, value: row.id })),
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to delete the selected employee?",
        default: false,
      },
    ]).then((answers) => {
      if (answers.confirm) {
        const sql = `DELETE FROM employees WHERE id = ?`;
        const params = [answers.employee];
        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log(`${result.affectedRows} employee deleted!\n`);
          promptMainMenu();
        });
      } else {
        promptMainMenu();
      }
    });
  });
}

module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
  deleteEmployee,
};
