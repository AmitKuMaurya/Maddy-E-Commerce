const {Router} = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/payment.controller");
const paymentRouter = Router();

const {isAuthenticatedUser} = require("../middlewares/authentification");

paymentRouter.get("/config",isAuthenticatedUser,sendStripeApiKey);
paymentRouter.post("/payment-process",isAuthenticatedUser,processPayment);

module.exports = {paymentRouter};