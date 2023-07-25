import { Sequelize } from "sequelize";
import db from "../config/Connect.js";

const {DataTypes} = Sequelize

const Product = db.define("product", {
    name: DataTypes.STRING,
    stock: DataTypes.STRING,
    price: DataTypes.STRING
}, {
    freezeTableName: true, 
})

export default Product;

// (async () => {
//     await db.sync()
// })();