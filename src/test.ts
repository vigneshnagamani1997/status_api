// src/index.js
import express from 'express';
import * as DotEnv from 'dotenv';
DotEnv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});
console.log('process.env',process.env);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});