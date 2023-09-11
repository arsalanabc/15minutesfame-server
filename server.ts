import express from 'express'
import dotenv from 'dotenv'
import log4js from 'log4js'
import routes from './src/routes/routes'
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config({path: './.env'})

const app = express(); 

const port = process.env.PORT;

log4js.configure('./src/config/log4js.json');

const log = log4js.getLogger();
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app)

app.listen(port, () => console.log(`this is ${process.env.NODE_ENV} listening at: ${port}`));
log.info('app launched and listening at', port);

module.exports = app;