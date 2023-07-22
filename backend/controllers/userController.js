import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!user){
        return res.json({msg:"user not found" })
    }
    
    return res.json(user);
}

export const createUser = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    // if(password !== confirmPassword) return res.status(400).json({msg: "password didn't match"})

    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds)
        res.json({password: hashPassword, name: username, email: email, confirmPassword: confirmPassword})
        // res.status(201).json({msg: "Register success"})
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}