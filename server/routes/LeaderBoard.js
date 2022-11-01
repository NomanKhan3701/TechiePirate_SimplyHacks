const express = require("express");
const router = express.Router();
const {LeaderBoard}=require("../classes/LeaderBoard")

const leaderboard=new LeaderBoard();
router.get("/",leaderboard.leaderboard );

module.exports = router;
