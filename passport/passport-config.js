const passport = require('passport');
const passportJWT = require("passport-jwt");
const user = require('../models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_JWT;

passport.use(new JWTStrategy(jwtOptions, function (jwtPayload, done) {
     var userc =  user.findByLogin(jwtPayload.login, function(err, userc){
      if(userc){
        done(null, userc);
      } else {
        done(null, false);
      }
     });
     
  //    .then(user => 
  //    {
  //      return done(null, user);
  //    } 
  //  ).catch(err => 
  //  {
  //    return done(err);
  //  });
  }
  ))

