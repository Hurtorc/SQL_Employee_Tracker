const { prompt } = require("inquirer");
const db = require("./db/connection");

// Function to view all departments
function viewDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log("DEPARTMENTS");
    console.log("-----------");
    rows.forEach((row) => {
      console.log(`${row.id} | ${row.name}`);
    });
    promptMainMenu();
  });
}

// Function to add a department
function addDepartment() {
  prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    },
  ]).then((answers) => {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [answers.name];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} department added!\n`);
      promptMainMenu();
    });
  });
}

//Function to delete a department
function deleteDepartment() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    prompt([
      {
        type: "list",
        name: "department",
        message: "Which department would you like to delete?",
        choices: rows.map((row) => ({ name: row.name, value: row.id })),
      },
    ]).then((answer) => {
      const deleteSql = `DELETE FROM departments WHERE id = ?`;
      const params = [answer.department];
      db.query(deleteSql, params, (err, result) => {
        if (err) throw err;
        console.log(`${result.affectedRows} department deleted!\n`);
        promptMainMenu();
      });
    });
  });
}

//exporting the functions

module.exports = { viewDepartments, addDepartment, deleteDepartment };