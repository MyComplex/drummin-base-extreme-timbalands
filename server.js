/* IMPORT MODULES */
const connection = require("./config/connection");
const inquirer = require("inquirer");
const Table = require("easy-table");

/* CONNECT TO DATABASE */
const empmgmtapp = () => {
    connection.connect(async (err) => {
        if (err) {
            console.log("");
            console.log("An error occurred while attempting to connect to the database!");
            console.log(`Here's what may be wrong: "${err.message}"`);
        };
        console.clear();
        console.log("Connected to the Employee Management System as id " + connection.threadId);
        console.log("╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗");
        console.log("║  $$$$$$$$\\ $$\\      $$\\ $$$$$$$\\  $$\\       $$$$$$\\ $$\\     $$\\ $$$$$$$$\\ $$$$$$$$\\                          ║");
        console.log("║  $$  _____|$$$\\    $$$ |$$  __$$\\ $$ |     $$  __$$\\\\$$\\   $$  |$$  _____|$$  _____|                         ║");
        console.log("║  $$ |      $$$$\\  $$$$ |$$ |  $$ |$$ |     $$ /  $$ |\\$$\\ $$  / $$ |      $$ |                               ║");
        console.log("║  $$$$$\\    $$\\$$\\$$ $$ |$$$$$$$  |$$ |     $$ |  $$ | \\$$$$  /  $$$$$\\    $$$$$\\                             ║");
        console.log("║  $$  __|   $$ \\$$$  $$ |$$  ____/ $$ |     $$ |  $$ |  \\$$  /   $$  __|   $$  __|                            ║");
        console.log("║  $$ |      $$ |\\$  /$$ |$$ |      $$ |     $$ |  $$ |   $$ |    $$ |      $$ |                               ║");
        console.log("║  $$$$$$$$\\ $$ | \\_/ $$ |$$ |      $$$$$$$$\\ $$$$$$  |   $$ |    $$$$$$$$\\ $$$$$$$$\\                          ║");
        console.log("║  \\________|\\__|     \\__|\\__|      \\________|\\______/    \\__|    \\________|\\________|                         ║");
        console.log("║  $$\\      $$\\  $$$$$$\\  $$\\   $$\\  $$$$$$\\   $$$$$$\\  $$$$$$$$\\ $$\\      $$\\ $$$$$$$$\\ $$\\   $$\\ $$$$$$$$\\   ║");
        console.log("║  $$$\\    $$$ |$$  __$$\\ $$$\\  $$ |$$  __$$\\ $$  __$$\\ $$  _____|$$$\\    $$$ |$$  _____|$$$\\  $$ |\\__$$  __|  ║");
        console.log("║  $$$$\\  $$$$ |$$ /  $$ |$$$$\\ $$ |$$ /  $$ |$$ /  \\__|$$ |      $$$$\\  $$$$ |$$ |      $$$$\\ $$ |   $$ |     ║");
        console.log("║  $$\\$$\\$$ $$ |$$$$$$$$ |$$ $$\\$$ |$$$$$$$$ |$$ |$$$$\\ $$$$$\\    $$\\$$\\$$ $$ |$$$$$\\    $$ $$\\$$ |   $$ |     ║");
        console.log("║  $$ \\$$$  $$ |$$  __$$ |$$ \\$$$$ |$$  __$$ |$$ |\\_$$ |$$  __|   $$ \\$$$  $$ |$$  __|   $$ \\$$$$ |   $$ |     ║");
        console.log("║  $$ |\\$  /$$ |$$ |  $$ |$$ |\\$$$ |$$ |  $$ |$$ |  $$ |$$ |      $$ |\\$  /$$ |$$ |      $$ |\\$$$ |   $$ |     ║");
        console.log("║  $$ | \\_/ $$ |$$ |  $$ |$$ | \\$$ |$$ |  $$ |\\$$$$$$  |$$$$$$$$\\ $$ | \\_/ $$ |$$$$$$$$\\ $$ | \\$$ |   $$ |     ║");
        console.log("║  \\__|     \\__|\\__|  \\__|\\__|  \\__|\\__|  \\__| \\______/ \\________|\\__|     \\__|\\________|\\__|  \\__|   \\__|     ║");
        console.log("║   $$$$$$\\ $$\\     $$\\  $$$$$$\\ $$$$$$$$\\ $$$$$$$$\\ $$\\      $$\\                                              ║");
        console.log("║  $$  __$$\\\\$$\\   $$  |$$  __$$\\\\__$$  __|$$  _____|$$$\\    $$$ |                                             ║");
        console.log("║  $$ /  \\__|\\$$\\ $$  / $$ /  \\__|  $$ |   $$ |      $$$$\\  $$$$ |                                             ║");
        console.log("║  \\$$$$$$\\   \\$$$$  /  \\$$$$$$\\    $$ |   $$$$$\\    $$\\$$\\$$ $$ |                                             ║");
        console.log("║   \\____$$\\   \\$$  /    \\____$$\\   $$ |   $$  __|   $$ \\$$$  $$ |                                             ║");
        console.log("║  $$\\   $$ |   $$ |    $$\\   $$ |  $$ |   $$ |      $$ |\\$  /$$ |                                             ║");
        console.log("║  \\$$$$$$  |   $$ |    \\$$$$$$  |  $$ |   $$$$$$$$\\ $$ | \\_/ $$ |                                             ║");
        console.log("║   \\______/    \\__|     \\______/   \\__|   \\________|\\__|     \\__|                                             ║");
        console.log("╚══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝");
        /* CALL MAIN MENU */
        await mainMenu();
    })
};

/* MAIN MENU FUNCTION */
const mainMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: [
                "I'd like to view all employees",
                "I'd like to add an employee",
                "I'd like to update an employee's role",
                "I'd like to view all roles",
                "I'd like to add a role",
                "I'd like to view all departments",
                "I'd like to add a department",
                "I'm done managing employees",
            ],
        },
    ]).then((answer) => {
        if (answer.menu === "I'd like to view all employees") {
            viewAllEmployees();
        } else if (answer.menu === "I'd like to add an employee") {
            addAnEmployee();
        } else if (answer.menu === "I'd like to update an employee's role") {
            updateAnEmployeesRole();
        } else if (answer.menu === "I'd like to view all roles") {
            viewAllRoles();
        } else if (answer.menu === "I'd like to add a role") {
            addARole();
        } else if (answer.menu === "I'd like to view all departments") {
            viewAllDepartments();
        } else if (answer.menu === "I'd like to add a department") {
            addADepartment();
        } else if (answer.menu === "I'm done managing employees") {
            console.clear();
            console.log("");
            console.log("Thank you for using the Employee Management System.");
            console.log("");
            connection.end();
        }
    });
};

/* INTERACTIVE FUNCTIONS */
/* VIEW ALL EMPLOYEES */
const viewAllEmployees = () => {
    connection.query("SELECT e.id AS ID, e.first_name AS First_Name, e.last_name AS Last_Name, role.title AS Title, department.name AS Department, CONCAT('$',FORMAT(role.salary, 2)) AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employee AS e LEFT JOIN role ON role.id = e.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee AS m ON m.id = e.manager_id", (err, res) => {
        if (err) {
            console.log("");
            console.log("An error occurred while attempting to retrieve the employees!");
            console.log(`Here's what may be wrong: "${err.message}"`);
        };
        console.log("");
        console.log(Table.print(res));
        /* CALL MAIN MENU */
        mainMenu();
    });
};

/* ADD AN EMPLOYEE */
const addAnEmployee = async () => {
    let managerNames = [];
    let roleNames = [];
    connection.query("SELECT CONCAT(first_name, ' ', last_name) AS manager FROM employee", async (err, res) => {
        if (err) {
            console.log("");
            console.log("An error occurred while attempting to retrieve the managers!");
            console.log(`Here's what may be wrong: "${err.message}"`);
        };
        res.forEach(element => {
            managerNames.push(element.manager);
        })
    })
    connection.query("SELECT title FROM role", async (err, res) => {
        if (err) {
            console.log("");
            console.log("An error occurred while attempting to retrieve the titles!");
            console.log(`Here's what may be wrong: "${err.message}"`);
        };
        res.forEach(element => {
            roleNames.push(element.title);
        })
    })
    await inquirer.prompt([
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
    ]).then((answer) => {
        let manager;
        let role;
        connection.query("SELECT id, first_name, last_name FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?", answer.newEmpMngr, (err, manres) => {
            if (err) {
                console.log("");
                console.log("An error occurred while attempting to retrieve the managers!");
                console.log(`Here's what may be wrong: "${err.message}"`);
            };
            manager = manres;
            connection.query("SELECT id, title FROM role WHERE title = ?", answer.newEmpRole, (err, rolres) => {
                if (err) {
                    console.log("");
                    console.log("An error occurred while attempting to retrieve the titles!");
                    console.log(`Here's what may be wrong: "${err.message}"`);
                };
                role = rolres;
                connection.query("INSERT INTO employee SET?", {
                    first_name: answer.newEmpFirstName,
                    last_name: answer.newEmpLastName,
                    role_id: role[0].id,
                    manager_id: manager[0].id
                }, (err) => {
                    if (err) {
                        console.log("");
                        console.log("An error occurred while attempting to create the new employee!");
                        console.log(`Here's what may be wrong: "${err.message}"`);
                    };
                    console.log("");
                    console.log("Employee added!");
                    viewAllEmployees();
                })
            })
        })
    })
};

/* UPDATE AN EMPLOYEES ROLE */
const updateAnEmployeesRole = async () => {
    connection.query("SELECT id AS ID, title AS TITLE, salary AS SALARY FROM role", async (err, res) => {
        if (err) {
            console.log("");
            console.log(`An error occurred while attempting to update ! Here's what it contains: "${err.message}"`);
        };
        console.table(res);
        mainMenu();
    });
};

/* VIEW ALL ROLES */
const viewAllRoles = async () => {
    connection.query("SELECT role.id AS ID, role.title AS Title, department.name AS Department, CONCAT('$',FORMAT(role.salary, 2)) AS Salary FROM role JOIN department ON department.id = role.department_id", async (err, res) => {
        if (err) {
            console.log("");
            console.log("An error occurred while attempting to retrieve the roles!");
            console.log(`Here's what may be wrong: "${err.message}"`);
        };
        console.log("");
        console.log(Table.print(res));
        /* CALL MAIN MENU */
        await mainMenu();
    });
};

/* ADD A ROLE */
const addARole = async () => {
    let deptNameArray = [];
    connection.query("SELECT * FROM department", async (err, res) => {
        if (err) {
            console.log("");
            console.log("An error occurred while attempting to add a role!");
            console.log(`Here's what may be wrong: "${err.message}"`);
        };
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
            connection.query("SELECT * FROM department WHERE name =?", answer.newRoleDepartment, async (err, res) => {
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
                await viewAllRoles();
            });
        });
};

/* VIEW ALL DEPARTMENTS */
const viewAllDepartments = async () => {
    connection.query("SELECT id AS ID, name AS Name FROM department", async (err, res) => {
        if (err) {
            console.log("");
            console.log("An error occurred while attempting to retrieve the departments!");
            console.log(`Here's what may be wrong: "${err.message}"`);
        };
        console.log("");
        console.log(Table.print(res));
        await mainMenu();
    });
};

/* ADD A DEPARTMENT */
const addADepartment = async () => {
    inquirer.prompt([
        {
            name: 'newDepartmentName',
            type: 'input',
            message: 'Enter the name of the new department:'
        }
    ]).then(async (answer) => {
        connection.query("INSERT INTO department SET?", {
            name: answer.newDepartmentName
        }, async (err) => {
            if (err) {
                console.log("");
                console.log("An error occurred while attempting to add a department!");
                console.log(`Here's what may be wrong: "${err.message}"`);
            };
            console.log("");
            console.log("The new department has been added!");
        });
        await viewAllDepartments();
    })
};

/* INITIALIZE THE APPLICATION */
empmgmtapp();