const { query } = require("express");
const {pool} = require("../models/db");



/* 
   id SERIAL NOT NULL,
    user_id INT,
    product_id INT,
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    PRIMARY KEY (id)
*/

//This function add product to cart
const addtoCart = (req,res)=>{
    const product_id = req.params.id;
    const user_id =  req.token.user_id;

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