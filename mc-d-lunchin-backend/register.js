import { DBConnection } from './DBC.js';
import bcrypt from 'bcrypt';

export async function RegisterUser(name, last_name, phone, email, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await connection.beginTransaction();
        const [user_rows] = await DBConnection.execute('INSERT INTO user (name, last_name, phone) VALUES (?, ?, ?)', [name, last_name, phone]);
        let user_id = user_rows.insertId
        await DBConnection.execute('INSERT INTO credentials (email, username, password, user_id) VALUES (?, ?, ?, ?)', [email, username, hashedPassword, user_id]);

        await connection.commit();
        return { success: true, userId: user_id };
    } catch (error) {
        await connection.rollback();
        return { success: false, message: error.message };
    }
}