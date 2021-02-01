'use strict';
var dbConn = require('../config/db.config');

//User object create
var User = function (user) {
    this.name = user.name;
    this.phoneNumber = user.phoneNumber;
    this.email = user.email;
    this.country = user.country;
    this.login = user.login;
    this.password = user.password;
    this.emailisVerified = user.emailisVerified;
    this.phoneNumberisVerified = user.phoneNumberisVerified;
    this.smsCredit = user.smsCredit;
    this.photo = user.photo;
};
User.create = function (newUser, result) {
    dbConn.query("INSERT INTO user set ?", newUser, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
User.findById = function (id, result) {
    dbConn.query("Select * from user where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
User.findAll = function (result) {
    dbConn.query("Select * from user", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('user : ', res);
            result(null, res);
        }
    });
};
User.update = function (id, user, result) {
    dbConn.query("UPDATE user SET name=?, phoneNumber=?, email=?, country=?, login=?, password=? , emailisVerified=?, phoneNumberisVerified=?, smsCredit=?, photo=? WHERE id = ?", [user.name, user.phoneNumber, user.email, user.country, user.login, user.password, user.emailisVerified, user.phoneNumberisVerified, user.smsCredit, user.photo, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
User.delete = function (id, result) {
    dbConn.query("DELETE FROM user WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = User;
