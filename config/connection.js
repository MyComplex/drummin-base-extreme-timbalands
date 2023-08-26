/* IMPORT MODULES */
require('dotenv').config();
const mysql = require('mysql2');

/* CREATE CONNECTION */
const connection = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

/* EXPORT CONNECTION */
module.exports = connection;
