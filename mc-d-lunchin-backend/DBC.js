import mysql from 'mysql2';
import fs from "fs";

export const DBConnection = await mysql.createPool(JSON.parse(fs.readFileSync("./sql_credentials.json", "utf8"))).promise()