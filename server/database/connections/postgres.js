// Env values
const user = process.env.POSTGRES_DB_USER;
const pwd = process.env.POSTGRES_DB_PASSWORD;
const schema = process.env.POSTGRES_DB_SCHEMA;
const port = process.env.POSTGRES_PORT;



// Connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize(`postgres://${user}:${pwd}@localhost:${port}/${schema}`, {
  logging: false // Avoid logging when managing data
});

module.exports = sequelize;