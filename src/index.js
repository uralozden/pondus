import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from 'config.js';
import User from './User.js';
import jwt from 'jsonwebtoken';
import AuthRouter from './routes';

mongoose.connect('mongodb://'+config.dbUser+':'+config.dbPassowrd+'@ds135916.mlab.com:35916/'+config.dbName, { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

AuthRouter(app);

app.listen(3300 , () => console.log('Başarıyla Çalıştı...'));

