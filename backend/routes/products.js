const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/products");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const productsRouter = express.Router();

productsRouter.post("/",authentication, createProduct);
productsRouter.get("/",getAllProducts)
module.exports = productsRouter;
