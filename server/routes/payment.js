const express = require("express");
const router = express.Router();

const {PaymentGateway}=require("../classes/PaymentGateway")

const paymentGateway = new PaymentGateway();
router.post("/", paymentGateway.processTransaction);

module.exports = router;
