const express = require("express");
const { createProduct, getAllProducts, getProductsByCategoryId, updateProduct } = require("../controllers/products");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const productsRouter = express.Router();

productsRouter.post("/",authentication,authorization("CREATE_PRODUCTS"), createProduct);
productsRouter.get("/",getAllProducts)
productsRouter.get("/:id",getProductsByCategoryId)
productsRouter.put("/:id",authentication,authorization("CREATE_PRODUCTS"),updateProduct)
module.exports = productsRouter;
