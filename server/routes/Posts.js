const express = require("express");
const router = express.Router();
const {
    getPosts,
    addPost,
    deletePost,
    addComment,
    getComments,
    deleteComment,}=require("../controllers/Posts")
const passport =require("passport");
require("../strategy/jwt-auth");

router.get("/",getPosts)
router.post("/",passport.authenticate('jwt', { session: false }),addPost)
router.delete("/",passport.authenticate('jwt', { session: false }),deletePost)
router.get("/Comments",getComments)
router.post('/Comments',addComment)
router.delete("/Comments",deleteComment)
module.exports = router;