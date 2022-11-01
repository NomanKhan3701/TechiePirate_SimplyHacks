const express = require("express");
const app = express();
const router = express.Router();
const {User} =require("../classes/User")
const passport = require("passport");
require("../strategy/jwt-auth");

const user = new User();

router.post("/login", user.login);
router.post("/signup", user.signup);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);
router.get("/profile", user.profile);

module.exports = router;
