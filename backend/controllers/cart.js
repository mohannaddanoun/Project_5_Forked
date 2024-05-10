const {pool} = require("../models/db");

//This function add product to cart
const addtoCart = (req,res)=>{
    const product_id = req.params.id;
    const user_id =  req.token.userId;

    pool.query(`INSERT INTO cart (user_id, product_id) VALUES ($1, $2);
    `,[user_id,product_id]).then((result)=>{
        res.status(201).json({
            success: true,
            message: "Product added to cart",
            result: result.rows,
        })
    }).catch((err)=>{
        res.status(500).json({
            success: false,
            message: "Server error",
            err: err,
        })
    })
}

module.exports = {
    addtoCart
}