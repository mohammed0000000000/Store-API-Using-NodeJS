require("dotenv").config();
const DBConnection = require("./config/DatabaseConnection");

const Product = require("./models/productSchema");

const jsonProduct = require("./products.json");
const mongoose = require("mongoose");


const start = async ()=>{
    try{
        await DBConnection();
        await Product.deleteMany({})
        await Product.create(jsonProduct);
        console.log("Success Connection");
        process.exit(0);
    }catch (error){
        console.log(error);
    }
}


start();