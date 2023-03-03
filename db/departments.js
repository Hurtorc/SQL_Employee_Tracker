const { prompt } = require("inquirer");
const db = require("./connection");

// Function to view all departments
async function viewDepartments() {
    try {
        const departments = await db.query(`SELECT * FROM departments`);
        return departments;
    } catch (err) {
        console.log(err);
    }
}

// Function to add a department
async function addDepartment() {
    try {
        const department = await prompt([
            {
                type: "input",
                name: "name",
                message: "Enter the name of the department:",
            },
        ]);
        await db.query(`INSERT INTO departments SET ?`, department);
        console.log(`Added ${department.name} to the database`);
    } catch (err) {
        console.log(err);
    }
}

// Function to delete a department
async function deleteDepartment() {
    try {
        const departments = await db.query(`SELECT * FROM departments`);
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        const { departmentId } = await prompt([
            {
                type: "list",
                name: "departmentId",
                message: "Choose the department to delete:",
                choices: departmentChoices,
            },
        ]);
        await db.query(`DELETE FROM departments WHERE id = ?`, departmentId);
        console.log(`Deleted department from the database`);
    } catch (err) {
        console.log(err);
    }
}



module.exports = { viewDepartments, addDepartment, deleteDepartment };
