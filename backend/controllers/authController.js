import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.js';

export const registerUser = async(req, res) => {
    try{
        const {password, email} = req.body;
        if(!password || !email)
            return res.status(400).json({success: false, message: "All fields are required"});
        const user = await userModel.findOne({email: req.body.email});
        if(user)
            return res.status(400).json({success: false, message: "Already existed user with this email" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            email: email,
            password: hashedPassword
        });
        await newUser.save();

        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.cookie('user', token, {httpOnly: true});

        return res.status(200).json({success: true, message: "User registered successfully!" });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occures while registering the user",
            error: err.message
        })
    }
}

export const loginUser = async(req, res) => {
    try{
        const {password, email} = req.body;
        if(!password || !email)
            return res.status(400).json({success: false, message: "All fields are required"});
        const user = await userModel.findOne({email: req.body.email});
        if(!user)
            return res.status(400).json({success: false, message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({success: false, message: "Invalid credentials" });

        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

        res.cookie('user', token, {httpOnly: true});
        return res.status(200).json({success: true, message: "Login successful!" });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "An error occures while login the user",
            error: err.message
        })
    }
}

export const logoutUser = (req, res) => {
    try{
        res.clearCookie('user', {httpOnly:true});
        return res.status(200).json({success: true, message: "Logged out successfully!"})
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "error occured at logging out",
            error: err.message
        })
    }
}

export const isLoggedIn = async (req, res)=>{
    try{
        const authCookie = req.cookies.user;
        if(!authCookie)
            return res.status(400).json({
            success: false,
            message: "There is no cookie!",
        });
        const decoded = jwt.verify(authCookie, process.env.JWT_SECRET);
        const user = await adminModel.findOne({email:decoded.email})
        if(user)
            return res.status(200).json({
                success: true
            });
        return res.status(400).json({
            success: false,
            message: "Cookie is not correct!",
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Something error occured in cookie getting",
            error: err.message
        })
    }
}