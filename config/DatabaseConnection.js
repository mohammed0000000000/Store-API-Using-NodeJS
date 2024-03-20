const mongoose = require("mongoose");


const DBconnection = async ()=>{
    await mongoose.connect(process.env.DATABASE_URI);
}

module.exports = DBconnection;