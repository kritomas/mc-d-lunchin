import { DBConnection } from './DBC.js';
import bcrypt from 'bcrypt';

export async function LoginUser(username, password) {
    const pool = await DBConnection();
    
    try {
        const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length === 0) {
            return { success: false, message: 'User not found' };
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return { success: false, message: 'Invalid password' };
        }

        return { success: true, userId: user.id };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
