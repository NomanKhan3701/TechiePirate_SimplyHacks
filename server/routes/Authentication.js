const express = require("express");
const app = express();

const router = express.Router();
const { login, signup, profile } = require("../controllers/Authentication");
const passport = require("passport");
require("../strategy/jwt-auth");
router.post("/login", login);
router.post("/signup", signup);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);
router.get("/profile", profile);

module.exports = router;
