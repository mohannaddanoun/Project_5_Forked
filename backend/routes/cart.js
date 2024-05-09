const express = require("express");
const { addtoCart } = require("../controllers/cart");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const cartRouter = express.Router();

cartRouter.post("/",addtoCart);

module.exports = productsRouter;
