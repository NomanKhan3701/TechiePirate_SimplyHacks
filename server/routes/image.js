const express = require("express");
const router = express.Router();
const {Image}=require("../classes/Image")

const image=new Image(); 
router.get("/getImage", image.getImages);
router.post("/addImage", image.addImage);

module.exports = router;
