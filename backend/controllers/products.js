const { pool } = require("../models/db");

//create new product

const createProduct = (req, res) => {
  const { image, title, description, price, category_id } = req.body;
  pool.query(`INSERT INTO products (image,title, description, price, category_id) VALUES ($1,$2,$3,$4,$5)RETURNING * ;`,[image, title, description, price, category_id]).then((result)=>{
    res.status(200).json({
        success :true,
        message:"producte have been inserted",
        result:result.rows
    })
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err,
    });
  });
};

module.exports={
    createProduct
}