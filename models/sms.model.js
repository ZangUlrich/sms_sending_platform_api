'use strict';
var dbConn = require('../config/db.config');

//sms object create
var Sms = function (sms) {
    this.message = sms.message;
    this.sending_date = sms.sending_date;
    this.smsisSend = sms.smsisSend;
    this.id_user = sms.id_user;
};

Sms.create = function (newsms, result) {
    dbConn.query("INSERT INTO sms set ?", newsms, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Sms.findById = function (id, result) {
    dbConn.query("Select * from sms where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Sms.findAll = function (result) {
    dbConn.query("Select * from sms", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('sms : ', res);
            result(null, res);
        }
    });
};
Sms.update = function (id, sms, result) {
    dbConn.query("UPDATE sms SET message=?, sending_date=?, smsisSend=?, id_user=? WHERE id = ?", [sms.message, sms.sending_date, sms.smsisSend, sms.id_user, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Sms.delete = function (id, result) {
    dbConn.query("DELETE FROM sms WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Sms;
