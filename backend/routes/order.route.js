const {Router} = require("express");
const { newOrder, getDetailedOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/order.controller");
const {isAuthenticatedUser, isAuthurized}  = require("../middlewares/authentification")
const orderRouter = Router();

orderRouter.post("/order/new",isAuthenticatedUser,newOrder);
orderRouter.get("/order/me",isAuthenticatedUser,myOrders);
orderRouter.get("/order/:id",isAuthenticatedUser,getDetailedOrder);
orderRouter.get("/admin/orders",isAuthenticatedUser,isAuthurized("admin"),getAllOrders);
orderRouter.put("/admin/order/:id",isAuthenticatedUser,isAuthurized("admin"),updateOrderStatus);
orderRouter.delete("/admin/order/:id",isAuthenticatedUser,isAuthurized("admin"),deleteOrder);

module.exports = {orderRouter}