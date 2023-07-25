import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        if(!user[0]) return res.res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) res.sendStatus(403);
            const userId = user[0].id;
            const username = user[0].username;
            const email = user[0].email;
            const accessTOken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '30s'
            })
            res.json({token: accessTOken})
        })
    } catch (error) {
        console.log(error)
    }
}