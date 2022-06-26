const express = require("express");
const router = express.Router();
const leaderboard  = require("../controllers/LeaderBoard");

router.get("/", leaderboard);

module.exports = router;
