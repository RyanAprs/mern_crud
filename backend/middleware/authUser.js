import User from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.json({ msg: "Please Login first" })
    }

    const user = await User.findOne({
        where: {
            id: req.session.userId
        }
    })

    if(!user) {
        return res.json({ msg: "User not found" })
    }

    req.userId = user.id;
    next();
}