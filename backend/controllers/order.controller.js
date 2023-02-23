const {order, OrderModel} = require("../models/order.model");
const {ProductModel}  = require("../models/product.model");
const asyncAwaitErr  = require("../middlewares/async.await.error");
const ErrorHandler = require("../utils/error.handler");

exports.newOrder = asyncAwaitErr(async(req,res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = await OrderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user: req.user._id
      });

      res.status(201).json({
        success : true,
        order
      })
});

// this is to get a detaied order indivisually 

exports.getDetailedOrder = asyncAwaitErr(async(req,res,next)=>{
    const order = await OrderModel.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHandler("order not found with this id ",404))
    }
    res.status(201).json({
        success : true,
        order
      })
})

// login user will get order detaied indivisually 

exports.myOrders = asyncAwaitErr(async(req,res,next)=>{
    const orders = await OrderModel.find({ user : req.user._id});

    res.status(201).json({
        success : true,
        orders
      })
    });


// get alll orders --- from admin 

exports.getAllOrders = asyncAwaitErr(async(req,res,next)=>{
    const orders = await OrderModel.find();

    let totalAmount = 0;
    
    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    });


    res.status(201).json({
        success : true,
        totalAmount,
        orders
      })
})

// from this controller admin will chang edthe status of order

exports.updateOrderStatus = asyncAwaitErr(async(req,res,next)=>{
    const order = await OrderModel.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("order does not exist with this id",404));
    }
    
    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async(order)=>{
            await updateStock(order.product,order.quantity);
        })
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("this product has been delivered, Already",404));
    }

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave : false});
    res.status(201).json({
        success : true
      })
})

async function updateStock(id,quantity){
    const product = await ProductModel.findById(id);
    product.stock -=  quantity;

    await product.save({ validateBeforeSave : false})
}
// delete order -- admin

exports.deleteOrder = asyncAwaitErr(async(req,res,next)=>{
    const order = await OrderModel.findById(req.params.id);

   
    if(!order){
        return next(new ErrorHandler("order does not exist with this id",404));
    }

    await order.remove();

    res.status(201).json({
        success : true,
      })
})




