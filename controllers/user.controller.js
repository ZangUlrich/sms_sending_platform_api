'use strict';

const User = require('../models/user.model');

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
        User.create(new_user, function (err, user) {
            if (err)
                res.send(err);
            const{password, ...userWithoutPassword} = new_user
            res.status(201).send({error: false, message: "User added successfully!", data: {id:user, ...userWithoutPassword}});
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
