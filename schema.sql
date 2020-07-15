-- Drops if it exists currently --
DROP DATABASE IF EXISTS corporate_db;
-- Creates the database --
CREATE DATABASE corporate_db;

-- Makes it so all of the following code will affect employee_db --
USE corporate_db;

-- Creates the table department --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  dept_name VARCHAR(30) NOT NULL,
--  all data contained within it will be unique --
  PRIMARY KEY (id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO department (dept_name)
VALUES ("Human Resources");



SELECT * FROM department;

-- Creates the table department --
CREATE TABLE role (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT AUTO_INCREMENT NOT NULL,
-- title of employee role
 role_title VARCHAR(30) NOT NULL,

salary DECIMAL(10, 0) NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
  dept_id INT NOT NULL,
--  all data contained within it will be unique --
  PRIMARY KEY (id)
);

INSERT INTO role (role_title, salary, dept_id)
VALUES ("HR Manager", 200000, 12);



SELECT * FROM role;




-- Creates the table department --
CREATE TABLE employee (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT AUTO_INCREMENT NOT NULL,
-- title of employee role
 first_name VARCHAR(30) NOT NULL,
 last_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "name" which cannot contain null --
 role_id INT NOT NULL,
 manager_id INT NULL,
--  all data contained within it will be unique --
  PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Awesome", 4, 12);

SELECT * FROM employee;




