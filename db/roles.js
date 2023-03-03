const { prompt } = require("inquirer");
const db = require("./connection");

//Function to view all roles
function viewAllRoles() {
  const sql = `SELECT role.id, role.title, department.name AS department, role.salary 
              FROM role
              LEFT JOIN department ON role.department_id = department.id
              ORDER BY role.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("Error retrieving roles from the database:");
      console.log(err);
      return;
    }
    console.table(rows);
    promptMainMenu();
  });
}

// Function to add a role
function addRole() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
        validate: (input) => {
          if (input.trim() === "") {
            return "Please enter a valid title.";
          }
          return true;
        },
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary of the role?",
        validate: (input) => {
          if (isNaN(input)) {
            return "Please enter a valid number.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "department",
        message: "Which department does the role belong to?",
        choices: rows.map((row) => ({ name: row.name, value: row.id })),
      },
    ]).then((answers) => {
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [answers.title, answers.salary, answers.department];
      db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log(`${result.affectedRows} role added!\n`);
        promptMainMenu();
      });
    });
  });
}

// Function to delete a role
function deleteRole() {
  const sql = `SELECT roles.id, roles.title, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    prompt([
      {
        type: "list",
        name: "role",
        message: "Choose the role to delete:",
        choices: rows.map((row) => ({
          name: `${row.title} (${row.department})`,
          value: row.id,
        })),
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure you want to delete the selected role?",
        default: false,
      },
    ]).then((answers) => {
      if (answers.confirm) {
        const sql = `DELETE FROM roles WHERE id = ?`;
        const params = [answers.role];
        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log(`${result.affectedRows} role deleted!\n`);
          promptMainMenu();
        });
      } else {
        promptMainMenu();
      }
    });
  });
}

module.exports = { viewAllRoles, addRole, deleteRole };
