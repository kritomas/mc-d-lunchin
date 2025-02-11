import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config()

function DBConnection(){
    const pool = mysql.createPool({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database:  process.env.database,
        port: process.env.port
    }).promise()
    return pool
}
