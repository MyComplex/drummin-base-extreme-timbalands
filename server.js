/* IMPORT MODULES */
const connection = require("./config/connection");
const inquirer = require("inquirer");
const Table = require("easy-table");

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
    connection.query("SELECT id AS ID, name AS Name FROM department", function (err, res) {
        if (err) throw err;
        console.log("");
        console.log(Table.print(res));
        console.log("");
        mainMenu();
    });
};

/* VIEW ALL ROLES */
const viewRoles = () => {
    connection.query("SELECT role.id AS ID, role.title AS Title, department.name AS Department, CONCAT('$',FORMAT(role.salary, 2)) AS Salary FROM role JOIN department ON department.id = role.department_id", function (err, res) {
        if (err) throw err;
        console.log("");
        console.log(Table.print(res));
        console.log("");
        mainMenu();
    });
};

/* VIEW ALL EMPLOYEES */
const viewEmployees = () => {
    connection.query("SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, role.title AS Title, department.name AS Department, CONCAT('$',FORMAT(role.salary, 2)) AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employee AS e LEFT JOIN role ON role.id = e.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee AS m ON m.id = e.manager_id", function (err, res) {
        if (err) throw err;
        console.log("");
        console.log(Table.print(res));
        console.log("");
        mainMenu();
    });
};

/* ADD A DEPARTMENT */
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDepartmentName',
            type: 'input',
            message: 'Enter the name of the new department:'
        }
    ])
        .then((answer) => {
            connection.query("INSERT INTO department SET?", {
                name: answer.newDepartmentName
            },
                function (err) {
                    if (err) throw err;
                    console.log("");
                    console.log("Department added!");
                    console.log("");
                    viewDepartments();
                });
        });
};

/* ADD A ROLE */
const addRole = () => {
    let deptNameArray = [];
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        res.forEach(element => {
            deptNameArray.push(element.name);
        });
    });
    inquirer.prompt([
        {
            name: 'newRoleTitle',
            type: 'input',
            message: 'Enter the title of the new role:'
        },
        {
            name: 'newRoleSalary',
            type: 'input',
            message: 'Enter the salary of the new role:'
        },
        {
            name: 'newRoleDepartment',
            type: 'list',
            message: 'Select the department the new role belongs to:',
            choices: deptNameArray
        },
    ])
        .then((answer) => {
            let departments;
            connection.query("SELECT * FROM department WHERE name =?", answer.newRoleDepartment, function (err, res) {
                if (err) throw err;
                departments = res;
                connection.query("INSERT INTO role SET?", {
                    title: answer.newRoleTitle,
                    salary: answer.newRoleSalary,
                    department_id: departments[0].id
                },
                    function (err) {
                        if (err) throw err;
                    });
                console.log("");
                console.log("Role added!");
                console.log("");
            });
            mainMenu();
        });
};

/* ADD AN EMPLOYEE */
const addEmployee = () => {
    let managerNames = [];
    let roleNames = [];
    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS manager FROM employee", function (err, res) {
        if (err) throw err;
        res.forEach(element => {
            managerNames.push(element.manager);
        })
    })
    connection.query("SELECT title FROM role", function (err, res) {
        if (err) throw err;
        res.forEach(element => {
            roleNames.push(element.title);
        })
    })
    inquirer.prompt([
        {
            name: 'newEmpFirstName',
            type: 'input',
            message: 'Enter the first name of the new employee:'
        },
        {
            name: 'newEmpLastName',
            type: 'input',
            message: 'Enter the last name of the new employee:'
        },
        {
            name: 'newEmpRole',
            type: 'list',
            message: 'Select the title of the new employee:',
            choices: roleNames
        },
        {
            name: 'newEmpMngr',
            type: 'list',
            message: 'Select the manager of the new employee:',
            choices: managerNames
        }
    ])
        .then((answer) => {
            let manager;
            let role;
            connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee WHERE manager =?", answer.newEmpMngr, function (err, res) {
                if (err) throw err;
                manager = res;
            })
            connection.query("SELECT id, title FROM role WHERE title =?", answer.newEmpRole, function (err, res) {
                if (err) throw err;
                role = res;
                
                connection.query("INSERT INTO employee SET?", {
                    first_name: answer.newEmpFirstName,
                    last_name: answer.newEmpLastName,
                    role_id: role[0].id,
                    manager_id: manager[0].id
                },
                    function (err) {
                        if (err) throw err;
                    })
                console.log("");
                console.log("Employee added!");
                console.log("");
            })
            mainMenu();
        })
};

/* VIEW ALL ROLES */
const updateEmployeeRole = () => {
    connection.query("SELECT id AS ID, title AS TITLE, salary AS SALARY FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};
