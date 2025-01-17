'use strict';

const User = require('../models/user.model');
const passport = require('../passport/passport-config');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

function genToken(user){
    return jwt.sign({
      iss: 'sms_sending_platform',
      login: user.login,
      password: user.password,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET_JWT); 
  }

exports.findAll = function (req, res) {
    User.findAll(function (err, user) {
        if (err)
            res.send(err);

        let userList = user.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        res.status(200).send(userList);
    });
};

exports.create = function (req, res) {
    const new_user = new User(req.body);
//handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {

        let loginExist = User.findByLogin(new_user.login, function(err, user){
            if(err)
                return res.send(err);
            if(loginExist)
                return res.status(403).json({ error: true, message: 'Email is already in use'});
        })

        User.create(new_user, function (err, user) {
            if (err)
                res.send(err);
            const{password, ...userWithoutPassword} = new_user

            let token = genToken(new_user)

            res.status(201).send({error: false, message: "User added successfully!", data: {token: token, id:user, ...userWithoutPassword}});
        });
    }
};
exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);

        if(user[0] !== undefined) {
            const {password, ...userWithoutPassword} = user[0];
            res.json(userWithoutPassword);
        }

        else{
            res.json({"error":"The user with id "+req.params.id+" doesn't exist"})
        }
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        User.update(req.params.id, new User(req.body), function (err, user) {
            if (err)
                res.send(err);
            const {password, ...userWithoutPassword} = user
            res.send({error: false, message: 'User successfully updated'});
        });
    }
};
exports.delete = function (req, res) {
    User.delete(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: 'User successfully deleted'});
    });
};

exports.login = function(req, res) {
    User.findUser(req.body.login, function (err, user) {
        if (err)
            res.send(err);
        if(!user)
            return res.json({error: true, message: 'user not in database'})
        if(user[0].password !== req.body.password)
            return res.json({error: true, message: 'the password is incorrect'})
        
        let token = genToken(user[0])

        res.json({error: false, message: 'user logged in', data: { token : token}})
    });
};