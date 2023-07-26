const { Sequelize } = require ("sequelize");
const db = require ("../config/Connect.js");

const {DataTypes} = Sequelize

const Product = db.define("product", {
    name: DataTypes.STRING,
    stock: DataTypes.STRING,
    price: DataTypes.STRING
}, {
    freezeTableName: true, 
})

module.exports = Product;

// (async () => {
//     await db.sync()
// })();