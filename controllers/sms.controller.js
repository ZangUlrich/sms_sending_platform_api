'use strict';

const Sms = require('../models/sms.model');

exports.findAll = function (req, res) {
    Sms.findAll(function (err, sms) {
        if (err)
            res.send(err);

        res.status(200).send(sms);
    });
};

exports.create = function (req, res) {
    const new_sms = new Sms(req.body);
//handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        Sms.create(new_sms, function (err, sms) {
            if (err)
                res.send(err);
            res.status(201).send({error: false, message: "sms added successfully!", data: sms });
        });
    }
};
exports.findById = function (req, res) {
    Sms.findById(req.params.id, function (err, sms) {
        if (err)
            res.send(err);

        res.json(sms);
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        Sms.update(req.params.id, new Sms(req.body), function (err, sms) {
            if (err)
                res.send(err);

            res.send({error: false, message: 'sms successfully updated'});
        });
    }
};
exports.delete = function (req, res) {
    Sms.delete(req.params.id, function (err, sms) {
        if (err)
            res.send(err);
        res.json({error: false, message: 'sms successfully deleted'});
    });
};
