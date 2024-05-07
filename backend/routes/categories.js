const express = require("express");

const { createNewCategory } = require("../controllers/categories");

// Create categories router

const categoriesRouter = express.Router();

categoriesRouter.post("/", createNewCategory);

module.exports = categoriesRouter;
