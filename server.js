require("dotenv").config();
require("express-async-error");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const mongoose = require("mongoose");
const DBConnection = require("./config/DatabaseConnection");

const productsRouter = require("./routes/products");
DBConnection();
app.use(express.json());

const {getAllProductStatic, getAllProduct} = require("./controller/products");

// routes
app.get("/",(req, res)=>{
    return res.send(`<h1> Store API<h1> <a href="/api/v1/products">products route</a> `);
});
app.use("/api/v1/products",productsRouter);


// products route
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

mongoose.connection.once("open",()=>{
    console.log(`Connection to Database Success`);
    app.listen(PORT,()=>{
        console.log(`Server Running in port ${PORT}`);
    });
})
mongoose.connection.on("error",(err)=>{
   console.log(`Error when Connection to Database \n ${err}`);
});
