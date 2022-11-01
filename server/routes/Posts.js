const express = require("express");
const router = express.Router();
const {Blogs}=require("../classes/Blogs")
const passport = require("passport");
require("../strategy/jwt-auth");

const blogs = new Blogs();
router.get("/", blogs.displayBlogs);
router.post("/", passport.authenticate("jwt", { session: false }), blogs.createBlog);
router.get("/getpost", blogs.displayBlog);
router.get("/Comments", blogs.showComments);
router.post(
  "/Comments",
  passport.authenticate("jwt", { session: false }),
  blogs.addComment
);
router.delete(
  "/Comments",
  passport.authenticate("jwt", { session: false }),
  blogs.deleteComment
);
module.exports = router;
