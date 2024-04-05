"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(
  require("winston-daily-rotate-file"),
);
const path_1 = __importDefault(require("path"));
// Define custom log format
const myFormat = winston_1.format.printf(
  ({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${date} ${hour} ${minute} [${label}] ${level}: ${message}`;
  },
);
const commonOptions = {
  level: "info",
  format: winston_1.format.combine(
    winston_1.format.label({ label: "ukil-saheb" }),
    winston_1.format.timestamp(),
    myFormat,
    winston_1.format.prettyPrint(),
  ),
  transports: [
    new winston_1.transports.Console(),
    new winston_daily_rotate_file_1.default({
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "15m",
      maxFiles: "7d",
      filename: getLogFilePath("success"),
    }),
  ],
};
// Configure main logger
const logger = (0, winston_1.createLogger)(commonOptions);
exports.logger = logger;
// Configure error logger
const errorLoggerOptions = {
  ...commonOptions,
  level: "error",
  transports: [
    ...commonOptions.transports,
    new winston_daily_rotate_file_1.default({
      ...commonOptions,
      filename: getLogFilePath("error"),
    }),
  ],
};
const errorLogger = (0, winston_1.createLogger)(errorLoggerOptions);
exports.errorLogger = errorLogger;
// Utility function to generate log file path
function getLogFilePath(logType) {
  return path_1.default.join(
    process.cwd(),
    "loggers",
    "winston",
    logType === "success" ? "successes" : "errors",
    `realChat-%DATE%-${logType}.log`,
  );
}
