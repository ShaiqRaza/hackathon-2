import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose.connect(`${process.env.DB_URI}/hackathon-2`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("dataBase connected Successfully");
})
.catch((err)=>{
    console.log("dataBase connection failed: ", err.message);
})