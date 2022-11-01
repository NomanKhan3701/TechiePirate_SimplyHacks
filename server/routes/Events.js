const express = require("express");
const router = express.Router();
const passport = require("passport");
const {Event}=require("../classes/Event")
require("../strategy/jwt-auth");

const event=new Event();
router.get("/", event.showEvent);
router.get("/view/:eventId",event.getEvent);
router.post("/", passport.authenticate("jwt", { session: false }), event.createEvent);
router.get("/comments", event.getComments);
router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  event.addComment
);
router.delete(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  event.de
);
router.post(
  "/participant",
  passport.authenticate("jwt", { session: false }),
  event.participateEvent
);
router.post(
  "/contributor",
  passport.authenticate("jwt", { session: false }),
  event.donateEvent
);

module.exports = router;
