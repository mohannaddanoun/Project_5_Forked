const express = require("express");
const {addtoOrders, addOrderToCartOrders} = require("../controllers/orders")

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const ordersRouter = express.Router();

 ordersRouter.post("/",authentication,addtoOrders)
 ordersRouter.post("/cart",addOrderToCartOrders)

module.exports = ordersRouter;

