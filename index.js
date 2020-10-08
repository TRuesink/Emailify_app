const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");

// connect with MongoDB database
mongoose.connect(keys.mongoURI);

const app = express();

// cookie-session stores all data in a cookie. express-session stores data outside the cookie
// middleware that alters request for every request
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// bring in google authentication routes
require("./routes/authRoutes")(app);

// logic for PORT choice
const PORT = process.env.PORT || 5000;

// listen to to PORT
app.listen(PORT, () => {
  console.log("server running on port 5000");
});
