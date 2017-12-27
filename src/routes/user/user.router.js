import express from 'express';
import config from 'config';
import User from 'User.js';
import jwt from 'jsonwebtoken';

const route = () => {
    const router = new express.Router();
    router.route('/list').get((req,res) => {
        User.find({}, {socialNetwork:0}).then( (data) => {
            const token =  jwt.sign({userId: data._id},config.jwtToken);
            const usertoken = {
                token: token
            }
            data.push(usertoken);
            res.send(data);
        });
    });

    router.route('/add').post((req,res) => {
        var newUser = new User();
        newUser.email = "u@buproject.net";
        newUser.firstName = "deneme 4";
        newUser.lastName = "xaa";
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
    return router;
}

export default{
    route,
    routePrefix: `/${config.version}/user`
}