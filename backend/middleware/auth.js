import User from "../models/userModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({Error: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    });
    if(!user) return res.status(404).json({Error: "User tidak ditemukan"});
    req.userId = user.id;
    req.username = user.username;
    next();
}