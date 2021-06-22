// Env values
const user = process.env.POSTGRES_DB_USER;
const pwd = process.env.POSTGRES_DB_PASSWORD;
const schema = process.env.POSTGRES_DB_SCHEMA;
const port = process.env.POSTGRES_PORT;



// Connection
const Sequelize = require('sequelize');
/**
 * In my experience it's always better to delegate building the entire conn string
 * to the environment, it allows more flexibility and also avoid silly mistakes
 */
const sequelize = new Sequelize(`postgres://${user}:${pwd}@localhost:${port}/${schema}`, {
  logging: false // Avoid logging when managing data
});

module.exports = sequelize;