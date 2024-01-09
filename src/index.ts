import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './routers';
import { databaseConnection } from './dbconfig'
import * as DotEnv from 'dotenv';
DotEnv.config();
const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const server = http.createServer(app);
new databaseConnection();
server.listen(3000, () => {
  console.info('Server running on http://127.0.0.1:3000/');
});



app.use('/', router());