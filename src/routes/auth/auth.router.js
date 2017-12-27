import express from 'express';
import config from 'config';
import User from 'User.js';
import jwt from 'jsonwebtoken';


const route = () => {
    const router = new express.Router();
    router.route('/login').post((req,res) => {
        console.log(req.body.email);
        User.find({email:req.body.email}, {socialNetwork:0}).then( (data) => {
            const token =  jwt.sign({userId: data._id},config.jwtToken);
            const usertoken = {
                token: token
            }
            data.push(usertoken);
            res.send(data);
        });
    });

    return router;
}

export default{
    route,
    routePrefix: `/${config.version}/auth`
}