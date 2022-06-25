const express = require("express");
const app = express();

const router = express.Router();
const { login, signup } = require("../controllers/Authentication");
// const passport = require("passport");
// require("../strategy/jwt-auth");
// app.use(passport.initialize());
router.post("/login", login);
router.post("/signup", signup);
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

module.exports = router;
