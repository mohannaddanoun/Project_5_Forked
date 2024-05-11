const express = require("express");

// Create comments router
const commentsRouter=express.Router()

// Import comments controllers
const{createNewComment,getCommentsByProduct,deleteCommentById}=require("../controllers/comments")

// Import Middleware
const authentication=require("../middlewares/authentication")
const authorization=require("../middlewares/authorization")





commentsRouter.post("/addComment:id",authentication,authorization("ADD_COMMENT"),createNewComment)
commentsRouter.get("/allCommentsByProduct:id",authentication,getCommentsByProduct)
commentsRouter.delete("/deleteCommentBy:id",authentication,authorization("CREATE_PRODUCTS"),deleteCommentById)


module.exports =commentsRouter