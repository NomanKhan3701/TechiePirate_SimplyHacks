const express = require("express");
const router = express.Router();
const { getImages, addImage, deleteImage } = require("../controllers/image");

router.get("/getImage", getImages);
router.post("/addImage", addImage);
router.delete("/deleteImage", deleteImage);

module.exports = router;
