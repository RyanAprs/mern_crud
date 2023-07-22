import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const Login = async (req, res) => {
    const password = req.body.password;

    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
    
        if(!user) return res.json({msg: "You are not registered"});
        const match = await bcrypt.compare(password, user.hashedPassword)
        if(!match) return res.json({msg: "wrong password"})
    
        req.session.userId = user.id;
    
        const id = user.id;
        const username = user.username;
        const email= user.email;
    
        res.json({id, username, email});
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (!username || !email || !password || !confirmPassword) {
            res.json({ msg: "Please enter all fields" });
            return; 
        }

        if (password !== confirmPassword) {
            res.json({ msg: "Passwords didn't match" });
            return; 
        }

        if (password.length < 6) {
            res.json({ msg: "Password must be at least 6 characters" });
            return; 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            hashedPassword,
        });

        res.json({ msg: "Registration success, you can login now" });
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