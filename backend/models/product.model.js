const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"please enter product name"],
        trim : true
    },
    description : {
        type : String,
        required : [true,"please enter product description"]
    },
    price : {
        type : Number,
        required : [true, "Please enter product price"],
        maxLength : [ 8 , "price cannot exceed 8 digits" ]
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [{
        public_id:{
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        },
    }],
    category:{
        type : String,
        required : [true , "Please enter product category"],
    },
    stock : {
        type : Number,
        required : [true , "Please enter product stock"],
        maxLength : [4 , "Stock cannot exceed length of 4"],
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : "user",
                required : true
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    user : {
        type : mongoose.Schema.ObjectId,
        ref : "user",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const ProductModel = mongoose.model("Product",productSchema);

module.exports = {
    ProductModel
}