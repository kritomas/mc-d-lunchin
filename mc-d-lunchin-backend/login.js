import { DBConnection } from './DBC.js';
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';

async function LoginUser(username) {
    try {

        let id;
        const [username_rows] = await DBConnection.execute('SELECT  id FROM user WHERE username = ?', [username]);

        if (username_rows.length === 0) {
            const [username_rows] = await DBConnection.execute('insert into user(username) values(?)', [username]);
            id = result.insertId;
        }else{
            id = username_rows[0]
        }

        return { success: true, userId: id };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function loginToStrav(username, password) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto('https://strav.nasejidelna.cz/0341/login', {
      waitUntil: 'networkidle0'
    });

    await page.waitForSelector('input[name="j_username"]');
    await page.waitForSelector('input[name="j_password"]');

    if (username.includes('@')) {
      if (username.endsWith('@spsejecna.cz')) {
        username = username.replace('@spsejecna.cz', '');
      } else {
        await browser.close();
        return false;
      }
    }


    await page.type('input[name="j_username"]', username);
    await page.type('input[name="j_password"]', password);

    await Promise.all([
      page.click('input[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    const currentUrl = page.url();

    const loginSuccess = currentUrl.includes('/faces/secured/main.jsp');

    await browser.close();

    return loginSuccess;
  }


export async function Login(username, password) {
try {
    const loginResult = await loginToStrav(username, password);

    if (loginResult) {
        let result = LoginUser(username)
        console.log('Login successful!');
        return result
    } else {
        return { success: false, message: "Skill issue" };
    }
} catch (error) {
    console.error('Skill issue but with style:', error);
}
}