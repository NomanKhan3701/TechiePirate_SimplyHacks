const express = require("express");
const router = express.Router();
const passport =require("passport");
const {
    getEvents,
    createEvent,
    deleteEvent,
    editEvent,
    addComment,
    getComments,
    deleteComment,
} =require("../controllers/Events");
require("../strategy/jwt-auth");

router.get("/",getEvents);
router.post("/",createEvent);
router.delete("/",deleteEvent);
router.patch("/",editEvent);
router.get("/comments",getComments);
router.post("/comments",addComment);
router.delete("/comments",deleteComment);

module.exports = router;