const { prompt } = require("inquirer");
const db = require("./connection");

// Function to view all roles
async function viewAllRoles() {
    try {
        const roles = await db.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id`
        );
        return roles;
    } catch (err) {
        console.log(err);
    }
}

// Function to add a role
async function addRole() {
    try {
        const departments = await db.query(`SELECT * FROM departments`);
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        const role = await prompt([
            {
                type: "input",
                name: "title",
                message: "Enter the name of the role:",
            },
            {
                type: "input",
                name: "salary",
                message: "Enter the salary for this role:",
            },
            {
                type: "list",
                name: "department_id",
                message: "Choose the department for this role:",
                choices: departmentChoices,
            },
        ]);
        await db.query(`INSERT INTO roles SET ?`, role);
        console.log(`Added ${role.title} to the database`);
    } catch (err) {
        console.log(err);
    }
}

// Function to delete a role
async function deleteRole() {
    try {
        const roles = await db.query(`SELECT * FROM roles`);
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));
        const { roleId } = await prompt([
            {
                type: "list",
                name: "roleId",
                message: "Choose the role to delete:",
                choices: roleChoices,
            },
        ]);
        await db.query(`DELETE FROM roles WHERE id = ?`, roleId);
        console.log(`Deleted role from the database`);
    } catch (err) {
        console.log(err);
    }
}



module.exports = { viewAllRoles, addRole, deleteRole };
