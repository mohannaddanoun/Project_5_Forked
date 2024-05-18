const express = require("express");

const { createNewCategory ,getAllCategories} = require("../controllers/categories");

// Create categories router

const categoriesRouter = express.Router();

categoriesRouter.post("/", createNewCategory);
categoriesRouter.get("/",getAllCategories)

module.exports = categoriesRouter;
