const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// import Google important keys
const keys = require("./config/keys");

const app = express();

// Set up for passport
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
    }
  )
);

// google authentication route
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// google authentication callback route
app.get("/auth/google/callback", passport.authenticate("google"));

// logic for PORT choice
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server running on port 5000");
});
