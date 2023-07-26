const  Product = require('../models/productModel.js')

const getProduct = async (req, res) => {
    try {
        const result = await Product.findAll()
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

const addProduct = async (req, res) => { 
    const name = req.body.name;
    const stock = req.body.stock;
    const price = req.body.price;

    try {
        await Product.create({
            name: name,
            stock: stock,
            price: price
        });
        return res.status(200).json({ msg: 'Product created successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error });
    }
}

const getProductById = async (req, res) => {
    try {
        const result = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

const updateProduct = async (req, res) => {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!product) {
            return res.json({msg: 'Product not found'});
        } 

        const name = req.body.name;
        const stock = req.body.stock;
        const price = req.body.price;

        try {
            await Product.update({
                name: name,
                stock: stock,
                price: price
            },
            {
                where: {
                    id: req.params.id
                }
            })
            res.json({msg: 'Product updated'})
        } catch (error) {
            console.log(error);
        }
}

const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!product) {
        return res.json({msg: 'Product not found'});
    }

    try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({msg: "Product deleted"})
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getProduct, addProduct, getProductById, updateProduct, deleteProduct} 