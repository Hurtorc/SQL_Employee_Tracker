const addRole = async () => {
  try {
    // Retrieve all departments from the database
    const departments = await db.query("SELECT * FROM departments");
    // Prompt user for role information
const { title, salary, department_id } = await prompt([
  {
    type: "input",
    message: "Enter the title of the role:",
    name: "title",
  },
  {
    type: "number",
    message: "Enter the salary for this role:",
    name: "salary",
  },
  {
    type: "list",
    message: "Choose the department for this role:",
    name: "department_id",
    choices: departments.map((department) => ({
      name: department.name,
      value: department.id,
    })),
  },
]);

// Add role to the database
await db.query(
  "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
  [title, salary, department_id]
);

console.log(`Role '${title}' has been added to the database.`);
} catch (err) {
console.log("Error adding role:", err);
}

// Ask user if they want to perform another action
await askUser();
};