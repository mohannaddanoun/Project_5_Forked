const express = require("express");
const { createProduct, getAllProducts, getProductsByCategoryId } = require("../controllers/products");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const productsRouter = express.Router();

productsRouter.post("/",authentication, createProduct);
productsRouter.get("/",getAllProducts)
productsRouter.get("/:id",getProductsByCategoryId)
module.exports = productsRouter;
