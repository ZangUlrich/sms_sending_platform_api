'use strict';

const passport = require('../passport/passport-config')
const Contact = require('../models/contact.model');
const User = require('../models/user.model');


exports.createContactAvatar = function (req, res){
    Contact.findById(req.params.id, function (err, contact) {

        try{
        if (err)
            res.send(err);
        
        if(!req.files) {
            res.json({
                error: true,
                message: 'No file uploaded'
            });
        } else {

            let contact1 = contact[0];
            let image = req.files.image;

            let imageLocation = __dirname + '/../uploads/images/contact' + contact1.id + image.name;
            
            image.mv(imageLocation, function(err){
                if(err)
                    res.send(err)

                contact1.photo = imageLocation;

                Contact.update(contact1.id, contact1, function(err, contact){
                    if(err)
                        res.send(err)
                    res.json({error: false, message: "image uploaded"})
                })
            });

        }
    } catch (err) {
        res.status(500).send(err);
    }

        
    });
}

exports.createUserAvater = function (req, res){
    User.findById(req.params.id, function (err, user) {

        try{
        if (err)
            res.send(err);
        
        if(!req.files) {
            res.json({
                error: true,
                message: 'No file uploaded'
            });
        } else {

            let user1 = user[0];
            let image = req.files.image;

            let imageLocation = __dirname + '/../uploads/images/user' + user1.id + image.name;
            
            image.mv(imageLocation, function(err){
                if(err)
                    res.send(err)

                user.photo = imageLocation;

                User.update(user1.id, user1, function(err, user){
                    if(err)
                        res.send(err)
                    res.json({error: false, message: "image uploaded"})
                })
            });

            

        }
    } catch (err) {
        res.status(500).send(err);
    }

        
    });
}