require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const router = require('./app/routers/index');

app.use(express.json());

app.use('/baskets', router);

app.get('/', (req, res)=> {
  res.send("Hello from client");
});

app.listen(port, ()=> {
  console.log(`Listening at http://localhost:${port}`);
});