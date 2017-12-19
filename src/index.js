import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config.json';
import User from './User.js';
import jwt from 'jsonwebtoken';

mongoose.connect('mongodb://'+config.dbUser+':'+config.dbPassowrd+'@ds135916.mlab.com:35916/'+config.dbName, { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/',  (req,res) => {

    User.find({}, {socialNetwork:0}).then( (data) => {
        const token =  jwt.sign({userId: data._id},config.jwtToken);
        const usertoken = {
            token: token
        }
        data.push(usertoken);
        res.send(data);
    });
});

app.post('/',  (req,res) => {
    var newUser = new User();
    newUser.email = "ural@buproject.net";
    newUser.firstName = "deneme 2";
    newUser.lastName = "Özden";
    newUser.password = "1234";
    newUser.dateCreated = new Date();
    newUser.dateModified = newUser.dateCreated;
    newUser.socialNetwork = {
        twitter:"twt",
        facebook:"face",
        denem:"asdasd"
    }
    newUser.save().then(
        (data) => {
            res.send(data);
        }, (err) => {
            res.send(err);
        }
    );
});


app.listen(3300 , () => console.log('Başarıyla Çalıştı...'));

