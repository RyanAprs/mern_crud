import { Sequelize } from "sequelize";
import db from "../config/Connect.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
})

export default Users;