require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
const mainRouter = require('./app/routers/index');
const headers = require('./app/middlewares/headers');

app.use(express.json());

app.use(headers);

app.use(mainRouter);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`Now listening at http://localhost:${port}`);
});
