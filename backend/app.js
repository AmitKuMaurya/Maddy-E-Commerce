const express = require("express"); 
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const {resolve} = require("path")
// const path = require("path");
// app.use(express.static(path.join(__dirname),"../frontend/build"));
const { errMiddleware } = require("./middlewares/error");

// config 
dotenv.config({path : "./config/config.env"})

// app.use(express.static(process.env.STATIC_DIR));

// console.log(process.env.FRONTEND_URL)
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors());

app.get("/",(req,res)=>{
  res.send(`This is Hosted website : ${process.env.FRONTEND_URL}`)
})

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/stripeapikey", (req, res) => {
    res.send({
      secretApiKey: process.env.STRIPE_API_KEY,
    });
  });
//   console.log(process.env.STRIPE_SECRET_KEY);
  
  app.post("/create-payment-intent", async (req, res) => {
    const {amount} = req.body; 
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 500000,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        }
      });
      // Send API key and PaymentIntent details to client
    //   console.log(paymentIntent.client_secret);
      res.send({
          clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
  });

const {productRouter} = require("./routes/product.route")
const {userRouter} = require("./routes/user.route");
const { orderRouter } = require("./routes/order.route");
// const { paymentRouter } = require("./routes/payment.route");

app.use("/api/v1",productRouter);
app.use("/api/v1",userRouter);
app.use("/api/v1",orderRouter);
// app.use("/api/v1",paymentRouter);


// app.use(express.static(path.join(__dirname),"../frontend/build"));

// middleware for error handling.
app.use(errMiddleware);

module.exports = app