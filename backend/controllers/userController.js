import Users from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'username', 'email']
        });
        return res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const {username, email, password, confirmPassword} = req.body;

    if(!username || !email || !password || !confirmPassword) {
        return res.status(400).json({msg: "Please enter all required fields"})
    }

    if(password !== confirmPassword) {
        return res.status(400).json({msg: "Password did not match"})
    }

    if(password.length < 6) {
        return res.status(400).json({msg: "Password must be at least 6 characters"})
    }

    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user) {
        return res.status(404).json({msg: "User already exist"})
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword
        })
        res.json({msg: "Register successfully"})
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({msg: "Please enter all required fields"})
    }

    try {
        const user  = await Users.findAll({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if(!match) return res.status(400).json({msg: "Wrong password "})

        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessTOken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s'
        })
        const refreshToken = jwt.sign({userId, username, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        
        return res.json({
                        msg: "Login successfully",
                        id: userId, 
                        name: username,  
                        email: email,
                        token: accessTOken
                    })
    } catch (error) {
        res.status(404).json({msg: "User is not already exist"})
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id;
        await Users.update({refresh_token: null}, {
            where: {
                id: userId
            }
        })
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}