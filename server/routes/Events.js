const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getEvents,
  createEvent,
  deleteEvent,
  editEvent,
  addComment,
  getComments,
  deleteComment,
  createParticipant,
  getEvent
} = require("../controllers/Events");
require("../strategy/jwt-auth");

router.get("/", getEvents);
router.get("/view/:eventId",getEvent);
router.post("/", passport.authenticate("jwt", { session: false }), createEvent);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteEvent
);
router.patch("/", passport.authenticate("jwt", { session: false }), editEvent);
router.get("/comments", getComments);
router.post(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  addComment
);
router.delete(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
router.post(
  "/participant",
  passport.authenticate("jwt", { session: false }),
);

module.exports = router;
