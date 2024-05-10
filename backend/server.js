const express = require("express");
require('dotenv').config();
const mysql = require("mysql");
const cors = require('cors');
const jwt = require("jsonwebtoken")

const app = express();

app.use(cors());
app.use(express.json());

const jwtKey = process.env.JWT_KEY;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM login WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error executing login query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const user = { email }; 
    jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.error('Error generating JWT token:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'Login successful', auth: token });
    });
  });
});

// Signup API
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  db.query('INSERT INTO login (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, results) => {
    if (err) {
      console.error('Error executing signup query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    const user = { email, name }; 
    jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.error('Error generating JWT token:', err);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'User registered successfully', auth: token });
    });
  });
});

app.listen(8081, () => {
  console.log(`Server is running`);
});
