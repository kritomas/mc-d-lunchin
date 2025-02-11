import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
}).promise();


// Získání jednoho uživatele podle ID
export async function getUser(id) {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0];
}

// Vytvoření nového uživatele
export async function createUser(name, last_name, phone, email, username, password) {
    const [userResult] = await pool.query(
        'INSERT INTO user (name, last_name, phone) VALUES (?, ?, ?)',
        [name, last_name, phone]
    );
    const userId = userResult.insertId;
    
    await pool.query(
        'INSERT INTO credentials (email, username, password, user_id) VALUES (?, ?, ?, ?)',
        [email, username, password, userId]
    );
    
    return getUser(userId);
}

// Přihlášení uživatele
export async function checkUser(identifier, password) {
    const [rows] = await pool.query(
        'SELECT * FROM credentials WHERE username = ? OR email = ?',
        [identifier, identifier]
    );
    
    if (rows.length === 0) return null;
    return rows[0];
}

// Smazání uživatele
//export async function deleteUser(id) {
//    await pool.query('DELETE FROM user WHERE id = ?', [id]);
//    return { message: "User deleted" };
//}

// Získání všech kategorií
export async function getCategories() {
    const [rows] = await pool.query("SELECT * FROM category");
    return rows;
}

// Získání všech jídel
export async function getFoods() {
    const [rows] = await pool.query("SELECT * FROM food");
    return rows;
}

// Přidání nového hodnocení
export async function createReview(user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation) {
    const [result] = await pool.query(
        `INSERT INTO review (user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, food_id, rating, comment, portion_size, temperature, appearance, extra_pay, cook_recommendation]
    );
    return result.insertId;
}

// Získání recenzí pro dané jídlo
export async function getReviewsForFood(food_id) {
    const [rows] = await pool.query('SELECT * FROM review WHERE food_id = ?', [food_id]);
    return rows;
}

// Získání jidla podle id
export async function getFoodByID(id) {
    const [rows] = await pool.query('SELECT name, type FROM food WHERE id = ?', [id]);
    return rows[0];
}


