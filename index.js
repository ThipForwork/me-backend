require('dotenv').config()
var express = require('express');
var cors = require('cors');
const mysql = require('mysql2/promise'); // ใช้ mysql2 ที่รองรับ Promise


async function main() {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  var app = express();

  app.use(cors());

  // Simple route
  app.get('/helloworld', function (req, res, next) {
    res.json({ msg: 'helloworld' });
  });

  // Users route
  app.get('/users', async function (req, res, next) {
    try {
      const [results, fields] = await connection.query('SELECT * FROM `users`');
      res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500).send('An error occurred');
    }
  });

  app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000');
  });
}

// Run the main function
main().catch((err) => {
  console.error('Failed to start the server:', err);
});
