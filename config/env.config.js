import 'dotenv/config';   // 👈 makes .env values appear on process.env
import fs from 'fs';
import path from 'path';

const ENV_NAME = process.env.ENV || 'qa';   // 👈 which environment? default to qa

function loadEnvFile() {
    // Build the path to config/environments/<ENV_NAME>.json
    const filePath = path.join(process.cwd(), 'config', 'environments', `${ENV_NAME}.json`);
    // If that file exists, read + parse it; otherwise return {} (safe fallback)
    return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : {};
}

const fileConfig = loadEnvFile();
const fileCreds = fileConfig.credentials || {};

const env = {
    name: fileConfig.name || ENV_NAME,
    // Order of precedence: .env variable  →  JSON file  →  hard-coded default
    baseURL: process.env.BASE_URL || fileConfig.baseURL || 'https://www.saucedemo.com',
    password: process.env.PASSWORD || fileCreds.password || 'secret_sauce',
    users: {
        standard: fileCreds.users?.standard || 'standard_user',
        lockedOut: fileCreds.users?.lockedOut || 'locked_out_user',
    },
    timeouts: { test: 60000, expect: 10000, action: 15000, navigation: 30000 },
    headless: process.env.HEADLESS !== 'false',

};

console.log("Current Environment:", ENV_NAME);
console.log("Environment Config:", env);

export default env;