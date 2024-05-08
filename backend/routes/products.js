const express = require("express");
const { createProduct } = require("../controllers/products");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const productsRouter = express.Router();

productsRouter.post("/",authentication, createProduct);

module.exports = productsRouter;
