// ============================================================
// Logger Utility - Enterprise E2E Automation Framework
// ============================================================
//
// Provides structured logging with info, warn, error, debug levels
// Uses winston library for file + console logging with timestamps
//
// ============================================================

import winston from 'winston';
import { fileURLToPath } from "url";
import path from 'path';
import fs from 'fs';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Remove ANSI color codes so the log file stays readable.
const stripAnsi = (message) => String(message).replace(/\u001b\[[0-9;]*[A-Za-z]/g, '');

// Folder where all execution and error logs will be stored.
const logsDir = path.resolve(__dirname, '../logs');

// Ensure the logs directory exists before writing any files.
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Format each log line as: [timestamp] [LEVEL] message
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

// Create the logger with a global INFO level threshold.
const logger = winston.createLogger({
    level: 'info',

    // Add timestamp + custom message format to every log entry.
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
    ),

    // Define the destinations where logs will be sent.
    transports: [
        // Print logs to the terminal for quick debugging.
       new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
        })
    )
}),
        // Store general runtime logs in execution.log.
        new winston.transports.File({
            filename: path.join(logsDir, 'execution.log'),
            maxsize: 5242880,
            maxFiles: 5
        }),

        // Store only error-level logs in error.log.
        new winston.transports.File({
            filename: path.join(logsDir, 'error.log'),
            level: 'error',

        })
    ]
});

class Logger {

    // Log a normal informational message.
    static info(message) {
        logger.info(stripAnsi(message));
    }

    // Log a warning-level message.
    static warn(message) {
        logger.warn(stripAnsi(message));
    }

    // Log a failure/error-level message.
    static error(message) {
        logger.error(stripAnsi(message));
    }

    // Log developer/debug information.
    static debug(message) {
        logger.debug(stripAnsi(message));
    }

    // Log a structured step number and message.
    static step(stepNumber, message) {
        logger.info(stripAnsi(`STEP ${stepNumber}: ${message}`));
    }

    // Log the beginning of a test case.
    static testStart(testName) {
        logger.info(stripAnsi(`========== TEST START: ${testName} ==========`));
    }

    // Log the end of a test case.
    static testEnd(testName) {
        logger.info(stripAnsi(`========== TEST END: ${testName} ==========`));
    }

    // Log a passing test result.
    static testPass(testName) {
        logger.info(stripAnsi(`✅ TEST PASSED: ${testName}`));
    }

    // Log a failing test result with the error details.
    static testFail(testName, error) {
        logger.error(stripAnsi(`❌ TEST FAILED: ${testName} | Error: ${error}`));
    }
}

export default Logger;