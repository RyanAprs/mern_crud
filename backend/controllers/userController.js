import User from "../models/userModel.js";
import bcrypt from "bcryptjs";  


export const Login = async (req, res) => {
    const {  email, password } = req.body;

    if (!email || !password) {
        res.json({ Error: "Please enter all fields" });
        return; 
    }

    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

    
        if(!user) return res.json({Error: "You are not registered"});
        const match = await bcrypt.compare(password, user.hashedPassword)
        if(!match) return res.json({Error: "wrong password"})
        
    
        res.json({Status: "Success"});
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (user) return res.json({Error: "You are already registered"})

        if (!username || !email || !password) {
            res.json({ Error: "Please enter all fields" });
            return; 
        }
        

        if (password.length < 6) {
            res.json({ Error: "Password must be at least 6 characters" });
            return; 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            hashedPassword,
        });

        res.json({ Status: "Success" });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error occurred" });
    }
};

export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.json({msg: "Cannot Logout"})

        res.json({msg: "Logout Successfully"})
    })
};