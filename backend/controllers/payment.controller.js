const asyncAwaitErr = require("../middlewares/async.await.error");
const dotenv = require("dotenv");
dotenv.config({path : "./config/config.env"});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

// app.use(express.static(process.env.STATIC_DIR));
// console.log(process.env.STATIC_DIR)

exports.sendStripeApiKey = asyncAwaitErr(async(req,res)=>{
  res.status(200).json({ secretApiKey : process.env.STRIPE_API_KEY})
});


// console.log(process.env.STRIPE_SECRET_KEY);

exports.processPayment = asyncAwaitErr(async(req,res,next)=>{
  
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          company: "Ecommerce",
        },
      });
    
      res
        .status(200)
        .json({ success: true, clientSecret: myPayment.client_secret });
    });


// console.log()
