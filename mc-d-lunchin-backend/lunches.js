import { DBConnection } from './DBC.js';

async function GetAllLunches() {
    try {
        const [username_rows] = await DBConnection.execute('SELECT * FROM food');
        return { success: true, data:username_rows };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

console.log(await GetAllLunches())