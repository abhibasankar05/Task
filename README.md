# Task
 Registration and login endpoints using nodejs, reactjs, mysql, JWT for authentication.

 how to run this project?
 1. install all packages which are required (npm,express,cors,nodemon,mysql,etc.)
 CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
 2. create database in your system create table which contains 4 columns (id,name,emailId,password)
 3. change database details according to you in the .env file which is in the backend folder.(user,password,etc)
 4. i have used bootstrap cdn link for styling.
 5. start the frontend and backend server.
