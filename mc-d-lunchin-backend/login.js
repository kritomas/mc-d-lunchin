import { DBConnection } from './DBC.js';
import bcrypt from 'bcrypt';

export async function LoginUser(name_email, password) {

    try {
        let user;
        const [username_rows] = await DBConnection.execute('SELECT  password,user_id FROM credentials WHERE username = ?', [name_email]);

        if (username_rows.length === 0) {
            const [email_rows] = await DBConnection.execute('SELECT password,user_id FROM credentials WHERE email = ?', [name_email]);
            if (email_rows.length === 0) {
                return { success: false, message: 'User not found' };
            }else{
                user = email_rows[0]
            }
        }else{
            user = username_rows[0]
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return { success: false, message: 'Invalid password' };
        }

        return { success: true, userId: user.user_id };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
