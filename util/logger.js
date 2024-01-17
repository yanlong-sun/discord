const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(label({ label: "my-discord-bot" }), timestamp(), myFormat),
  transports: [
    new transports.Console(), // Output to console
    new transports.File({ filename: "combined.log" }), // Output to file
  ],
});

module.exports = logger;
