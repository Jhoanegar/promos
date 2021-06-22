/**
 * Look into @babel/register module to allow the use of import syntax over require
 */
require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
/**
 * /index is unnecessary, global.require will look for a index.js file if the
 * path to the require'd module is a folder
 */
const mainRouter = require('./app/routers/index');
/**
 * Investigate the NODE_PATH env variable to allow app/middleware/headers
 * style of imports/requires
 */
const headers = require('./app/middlewares/headers');

app.use(express.json());

/**
 * You may want to look into cors npm module. Also "headers" is not agreat name
 * for this middleware
 */
app.use(headers);

app.use(mainRouter);

/**
 * Look into SwaggerUI or the swagger.yml file. It's a great thing to have in your root
 * path
 */
app.get("/", (req, res) => {
  res.send("Hello from server");
});

/**
 * Investigate the /bin/www approach to initialize a node js app. It allows you
 * to decouple the server from the actual application
 * */ 
app.listen(port, () => {
  console.log(`Now listening at http://localhost:${port}`);
});


/**
 * You are missing prettier or eslint! They are specially helpful if you are new
 * to the NodeJS ecosystem.
 */
