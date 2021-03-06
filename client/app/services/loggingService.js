/** 
 * Winston Logger 
 **/

 const winston = require("winston");

 // Attention!! Path starts from root folder, not from this place
 const error = "./log/error.log";
 
 // Only define winston for errors
 const errorLogger = winston.createLogger({
   level: "error",
   format: winston.format.json(),
   defaultMeta: { service: "user-service" },
   transports: [
     new winston.transports.File({ filename: error, level: "error" }),
   ],
 });
 
 module.exports = { errorLogger };
 