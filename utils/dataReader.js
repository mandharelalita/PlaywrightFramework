import fs from 'fs';
// fs

// File System module.

// याचा उपयोग:

// File वाचणे
// File create करणे
// File delete करणे
// // File अस्तित्वात आहे का ते check करणे
import path from 'path';


//cwd - current working directory
const DATA_DIR = path.join(process.cwd(), 'test-data');


function readJSON(fileName) {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Test data file not found: ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export { readJSON };