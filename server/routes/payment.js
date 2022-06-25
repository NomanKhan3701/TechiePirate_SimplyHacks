const express = require("express");
const router = express.Router();

const { makePayment } = require("../controllers/payment");
router.post("/", makePayment);

module.exports = router;
