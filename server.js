/* IMPORT MODULES */
const connection = require("./config/connection");
const inquirer = require("inquirer");

/* CONNECT TO DATABASE */
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    /* CALL MAIN MENU */
    mainMenu();
});

/* MAIN MENU FUNCTION */
const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "Select an option:",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Exit",
            ],
            default: "Exit",
        },
    ])
        .then((answer) => {
            if (answer.menu === "View all departments") {
                viewDepartments();
            } else if (answer.menu === "View all roles") {
                viewRoles();
            } else if (answer.menu === "View all employees") {
                viewEmployees();
            } else if (answer.menu === "Add a department") {
                addDepartment();
            } else if (answer.menu === "Add a role") {
                addRole();
            } else if (answer.menu === "Add an employee") {
                addEmployee();
            } else if (answer.menu === "Update an employee role") {
                updateEmployeeRole();
            } else if (answer.menu === "Exit") {
                connection.end();
            }
        });
};

/* INTERACTIVE FUNCTIONS */
/* VIEW ALL DEPARTMENTS */
const viewDepartments = () => {
    connection.query("SELECT id AS ID, name AS NAME FROM department", function (err, res) {
        if (err) throw err;
        console.table(res, ["ID", "NAME"]);
        mainMenu();
    });
};

/* VIEW ALL ROLES */
const viewRoles = () => {
    connection.query("SELECT id AS ID, title AS TITLE, salary AS SALARY FROM role", function (err, res) {
        if (err) throw err;
        console.log(res);
        // console.table(res, ["ID", "TITLE", "SALARY"]);
        mainMenu();
    });
};
