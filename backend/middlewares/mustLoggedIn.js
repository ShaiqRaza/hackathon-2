import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import {userModel} from '../models/user.js';

export const mustLoggedIn = async (req, res, next)=>{
    try{
        const authCookie = req.cookies.user;
        if(!authCookie)
            return res.json({success: false, message:"User is not logged in"})
        const decoded = jwt.verify (authCookie, process.env.JWT_SECRET);
        const admin = await userModel.findOne({email:decoded.email})
        if(admin){
            return next();
        }
        return res.json({success: false, message:"User is not logged in"})
    }
    catch(err){
        res.status(504).json({
            success: false,
            message: "Something error occured in cookie getting",
            error: err.message
        })
    }
}