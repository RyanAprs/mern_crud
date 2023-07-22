import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

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

        res.json({ msg: "Registration success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error occurred" });
    }
};

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!user) {
        return res.status(404).json({msg: "User not found"});
    }

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

    try {
        await User.update({
            username,
            email,
            hashedPassword
        }, {
            where: {
                id: req.params.id
            }
        })
        res.json({ msg: "User updated successfully" });
    } catch (error) {
        console.log(error)
    }

}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!user) {
        return res.json({msg: "user not found"})
    }

    try{
        await user.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({msg: "User deleted successfully"})
    } catch(error) {
        console.log(error)
    }
}