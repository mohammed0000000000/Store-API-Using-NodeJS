const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const productSchema  = new Schema({
    name:{
        type:String,
        required:[true, "Product name must be provided"],
    },
    price:{
        type:Number,
        required:[true, "Product price must be provided"],
    },
    feature:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} IS NOT Supported',
        }
        // enum:['ikea','liddy','caressa','marcos'],
    }
})


module.exports = mongoose.model("Product",productSchema);