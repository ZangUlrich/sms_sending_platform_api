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

Destination.getContactsGroupMessage = function (result){
    dbConn.query("SELECT contact.id AS contact_id, contact.name, sms.message, sms.sending_date\n" +
        "FROM contact\n" +
        "INNER JOIN destination ON destination.id_contact = contact.id\n" +
        "INNER JOIN sms ON destination.id_sms = sms.id\n" +
        "HAVING sms.sending_date IN (\n" +
        "    SELECT MAX(sms.sending_date)\n" +
        "    FROM sms\n" +
        "     INNER JOIN destination ON destination.id_sms = sms.id\n" +
        "    INNER JOIN contact ON contact.id = destination.id_contact\n" +
        "    WHERE contact.id = contact_id)", function (err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

Destination.getMessagesForGroupContact= function (contact_id,result){
    dbConn.query("SELECT sms.id, sms.message, sms.sending_date \n" +
        "FROM sms WHERE sms.id IN (\n" +
        "  SELECT sms.id \n" +
        "    FROM destination\n" +
        "    INNER JOIN sms ON sms.id=destination.id_sms\n" +
        "    INNER JOIN contact ON contact.id=destination.id_contact\n" +
        "    WHERE contact.id=?\n" +
        "\n" +
        ")", contact_id, function (err,res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}
module.exports = Destination;
