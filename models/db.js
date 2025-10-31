const mysql = require('mysql2/promise');

// Create the database if it doesn't exist
const initDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS social_media_db`);
    console.log('✅ Database created or already exists');
    await connection.end();
  } catch (err) {
    console.error('❌ Error creating database:', err);
  }
};

// Immediately create the DB when server starts
initDB();

// Connect to the created database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'social_media_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
