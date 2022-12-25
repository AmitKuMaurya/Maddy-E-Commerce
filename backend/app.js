const express = require("express"); 
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { errMiddleware } = require("./middlewares/error");

app.use(express.json());
app.use(cookieParser())
app.use(cors());

const {productRouter} = require("./routes/product.route")
const {userRouter} = require("./routes/user.route");
const { orderRouter } = require("./routes/order.route");

app.use("/api/v1",productRouter);
app.use("/api/v1",userRouter);
app.use("/api/v1",orderRouter);

// middleware for error handling.

app.use(errMiddleware)

module.exports = app