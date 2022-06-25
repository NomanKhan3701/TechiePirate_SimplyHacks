const express = require("express");
const router = express.Router();
const {
    getPosts,
    addPost,
    deletePost,
    addComment,
    getComments,
    deleteComment,
    getPost, } = require("../controllers/Posts")
const passport = require("passport");
require("../strategy/jwt-auth");

router.get("/", getPosts)
router.post("/", passport.authenticate('jwt', { session: false }), addPost)
router.delete("/", passport.authenticate('jwt', { session: false }), deletePost)
router.get("/getpost", getPost);
router.get("/Comments", getComments)
router.post('/Comments', passport.authenticate('jwt', { session: false }), addComment)
router.delete("/Comments", passport.authenticate('jwt', { session: false }), deleteComment)
module.exports = router;