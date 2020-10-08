const passport = require("passport");
const mongoose = require("mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// import Google important keys
const keys = require("../config/keys");

// fetch model class from mongoose
const User = mongoose.model("users");

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id); //user.id is the OID given by mongo. we turned mongoose model instance into a user id
});

//deserialize user - take a cookie (id) and return a mongoose model instance
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Set up for passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOne gives us a promise
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we already have a record with given profile id
          done(null, existingUser); // first arg is a potential error (null because we dont expect an error)
          console.log("This user already exists");
        } else {
          //we don't have a user record with this ID
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user)); // the "user" instance is given to us by the promise
        }
      });
    }
  )
);
