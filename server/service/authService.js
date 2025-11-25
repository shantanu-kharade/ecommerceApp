import userModel from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'

const loginService = async (req,res) => {
     try {
        let user = await userModel.findOne({email : req.body.email})
        if(!user){
            return res.send("Email id is not registered")
        }
       
        //verify password
        const isMatch = await bcrypt.compare(req.body.password , user.password);
        if(!isMatch){
            return  res.send("Invalid credentials");
        }

        //jwt token
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });


        res.json({ token });
    }
    catch (error) {
        res.send(error.message);
    }
}


const registerService = async (req,res) => {

    try {
        const { userName, email, password, profilePic, role} = req.body;

        let user = await userModel.findOne({email : email});
        if(user){
            return res.send("email id already registered!")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user = new userModel({
            userName: userName,
            email: email,
            password: hashedPassword,
            profilePic: profilePic,
            role : role
        })

        user = await user.save();

        if (!user) {
            return res.status(400).send("User Cannot created");
        }

        res.status(201).json({message : "User Created Successfully", user});
    }
    catch (error) {
        res.send(error.message);
    }
}





const logoutService = async (req,res) => {
    try {
        // Invalidate the token on client side by removing it
        res.json({ message: "User logged out successfully" });
    }
    catch (error) {
        res.send(error.message);
    }
}

export {
    loginService,
    registerService,
    logoutService
}