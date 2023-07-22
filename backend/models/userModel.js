import { Sequelize } from "sequelize";
import db from "../config/Connect.js";

const {DataTypes} = Sequelize

const User = db.define("users", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    hashedPassword: {
        type: DataTypes.STRING, 
        allowNull: false,
    }
}, {
    freezeTableName: true, 
})

export default User;

