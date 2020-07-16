var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "corporate_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
   function start() {
     inquirer
      .prompt({
        name: "choice",
        type: "checkbox",
        message: "Which option would you like to complete?",
        choices: [
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "View a Department",
          "View a Role",
          "View an Employee",
          // "Update an Employees' Role",
          "Finished"
        ]
      })
      .then(function(answer) {
          console.log(answer);
        switch (answer.choice[0]) {
            
        case "Add a Department":
          addDept();
          break;
  
        case "Add a Role":
          addRole();
          break;
  
        case "Add an Employee":
          addEmp();
          break;
  
        case "View a Department":
          viewDept();
          break;
  
        case "View a Role":
            viewRole();
          break;

        case "View an Employee":
            viewEmp();
            break;
        // case "Update an Employees' Role":
            // upEmpRole();
        case "Finished":
            default:
                console.log("You completed all your tasks!");
                connection.end();
            
        }
      });
  }
  


  function addDept() {
    inquirer
      .prompt([{
        name: "deptName",
        type: "input",
        message: "Add the name of the new Department here",
        validate: function(value) {
                  if (isNaN(value) === true) {
                    return true;
                  }
                }
      }])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO department SET ?",
          {
            dept_name: answer.deptName,
          },
          function(err) {
            if (err) throw err;
            console.log("Your department was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }

  function addRole() {
    inquirer
      .prompt([
          {
        name: "roleTitle",
        type: "input",
        message: "Add the name of the new Role here",
        },
        {
            name: "roleSalary",
            type: "number",
            message: "Add the Salary for this Role",
        },
        {
            name: "deptId",
            type: "input",
            message: "What is the ID number for this department Role?",
        },
    ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO role SET ?",
          {
            role_title: answer.roleTitle,
            salary: answer.roleSalary,
            dept_id: answer.deptId,
          },
          function(err) {
            if (err) throw err;
            console.log("Your Role was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
  
  function addEmp() {
    inquirer
      .prompt([
        {
        name: "firstName",
        type: "input",
        message: "Add the New Employees First name here",
        },
        {
        name: "lastName",
        type: "input",
        message: "Add the New Employee Last name here",
        },
        {
        name: "roleId",
        type: "input",
        message: "Add the ID number for this Employees new Role here",
        },
        {
            name: "mangerId",
            type: "input",
            message: "What is the ID number for this Employees' Manager?",
        },
    ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          
          function(err) {
            if (err) throw err;
            console.log("Your Employee was created successfully!");
           console.table(answer); 
            // re-prompt the user for if they want to bid or post
            
            start();
          }
        );
      });
  }

  function viewDept() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      start();
      // connection.end();
    });
  }
  function viewRole() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      start();
      ;
    });
  }
  
  function viewEmp() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT * FROM employee", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      start();
    });
  }

