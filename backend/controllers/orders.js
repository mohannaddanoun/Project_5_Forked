const { pool } = require("../models/db");
let orderID;
//This function add product to cart
const addtoOrders = (req, res) => {
  const cart_id = req.params.id;
  const user_id = req.token.userId;

  pool
    .query(
      `INSERT INTO orders (user_id) VALUES ($1) RETURNING *;
    `,
      [user_id]
    )
    .then((result) => {
        orderID=result.rows[0].id
        console.log(orderID);
      res.status(201).json({
        success: true,
        message: "user added to orders",
        result: result.rows,
      });
    })
    .catch((err) => {
        console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
        
      }
      );
    });
};


const addOrderToCartOrders = (req, res) => {
    const cart_id = req.body;
    
    pool
      .query(
        `INSERT INTO cart_order (cart_id,order_id) VALUES ($1,$2) RETURNING *;
      `,
        [cart_id,orderID]
      )
      .then((result) => {
          orderID=result.rows[0].id
          console.log(orderID);
        res.status(201).json({
          success: true,
          message: "carts added to orders",
          result: result.rows,
        });
      })
      .catch((err) => {
          console.log(err);
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
          
        }
        );
      });
  };

module.exports = {
addtoOrders,
addOrderToCartOrders
}