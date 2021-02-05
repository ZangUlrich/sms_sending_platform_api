'use strict';

const Destination = require('../models/destination.model');

exports.findAll = function (req, res) {
    Destination.findAll(function (err, destination) {
        if (err)
            res.send(err);

        res.status(200).send(destination);
    });
};

exports.create = function (req, res) {
    const new_destination = new Destination(req.body);
//handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        Destination.create(new_destination, function (err, destination) {
            if (err)
                res.send(err);
            res.status(201).send({error: false, message: "destination added successfully!", data: destination });
        });
    }
};
exports.findById = function (req, res) {
    Destination.findById(req.params.id, function (err, destination) {
        if (err)
            res.send(err);

        res.json(destination);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        Destination.update(req.params.id, new Destination(req.body), function (err, destination) {
            if (err)
                res.send(err);

            res.send({error: false, message: 'destination successfully updated'});
        });
    }
};
exports.delete = function (req, res) {
    Destination.delete(req.params.id, function (err, destination) {
        if (err)
            res.send(err);
        res.json({error: false, message: 'destination successfully deleted'});
    });
};
