const express = require("express");
const router = express.Router();

const { News } = require("../classes/News");
const news=new News();
router.get("/", news.getNews);

module.exports = router;
