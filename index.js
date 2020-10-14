const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/User");
require("./services/passport");

// connect with MongoDB database
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
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
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve production assets like our main.js file or main.css file
  app.use(express.static("client/build"));
  // Express will serve the index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// logic for PORT choice
const PORT = process.env.PORT || 5000;

// listen to to PORT
app.listen(PORT, () => {
  console.log("server running on port 5000");
});
