const express = require("express");
const { createMessage,getAllMessages} = require("../controllers/message");

//authentication and authorization
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const messageRouter = express.Router();

messageRouter.post("/",authentication,createMessage);
messageRouter.get("/",getAllMessages)

module.exports = messageRouter;