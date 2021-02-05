'use strict';
var dbConn = require('../config/db.config');

//destination object create
var Destination = function (destination) {
    this.id_sms = destination.id_sms;
    this.id_contact = destination.id_contact; 
};

Destination.create = function (newdestination, result) {
    dbConn.query("INSERT INTO destination set ?", newdestination, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Destination.findById = function (id, result) {
    dbConn.query("Select * from destination where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Destination.findAll = function (result) {
    dbConn.query("Select * from destination", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('destination : ', res);
            result(null, res);
        }
    });
};
Destination.update = function (id, destination, result) {
    dbConn.query("UPDATE destination SET id_sms=?, id_contact=? WHERE id = ?", [destination.id_sms, destination.id_contact, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Destination.delete = function (id, result) {
    dbConn.query("DELETE FROM destination WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Destination;
