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

function updateDepartment() {
  // Prompt the user to select the department to update and enter the new department name
  const departmentChoices = [];
  const sql = "SELECT * FROM department ORDER BY name";
  db.query(sql, (err, rows) => {
    if (err) {
      console.log("Error retrieving departments from the database:");
      console.log(err);
      promptMainMenu();
      return;
    }
    // Create an array of department choices for the prompt
    rows.forEach((department) => {
      departmentChoices.push({ name: department.name, value: department.id });
    });

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department do you want to update?",
        choices: departmentChoices,
      },
      {
        type: "input",
        name: "newDepartmentName",
        message: "Enter the new name for the department:",
      },
    ]).then((answers) => {
      const sql = `UPDATE department SET name = ? WHERE id = ?`;
      db.query(
        sql,
        [answers.newDepartmentName, answers.departmentId],
        (err, result) => {
          if (err) {
            console.log("Error updating department:");
            console.log(err);
          } else {
            console.log(
              `Successfully updated department ${answers.departmentId}!`
            );
          }
          promptMainMenu();
        }
      );
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

module.exports = { viewDepartments, addDepartment, updateDepartment, deleteDepartment };
