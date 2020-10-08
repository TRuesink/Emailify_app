const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  // google authentication callback route
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout(); // kills the cookie
    res.send("You have been signed out");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
// google authentication route
