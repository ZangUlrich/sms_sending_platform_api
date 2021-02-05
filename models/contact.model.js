'use strict';
var dbConn = require('../config/db.config');

//contact object create
var Contact = function (contact) {
    this.name = contact.name;
    this.phoneNumber = contact.phoneNumber;
    this.photo = contact.photo;
    this.id_user = contact.id_user;
};

Contact.create = function (newcontact, result) {
    dbConn.query("INSERT INTO contact set ?", newcontact, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Contact.findById = function (id, result) {
    dbConn.query("Select * from contact where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Contact.findAll = function (result) {
    dbConn.query("Select * from contact", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('contact : ', res);
            result(null, res);
        }
    });
};
Contact.update = function (id, contact, result) {
    dbConn.query("UPDATE contact SET name=?, phoneNumber=?, photo=?, id_user=? WHERE id = ?", [contact.name, contact.phoneNumber, contact.photo, contact.id_user, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Contact.delete = function (id, result) {
    dbConn.query("DELETE FROM contact WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = Contact;
