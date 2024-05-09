const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
require("./models/db");

//built in middleware
app.use(express.json());

//import routes
const roleRouter = require("./routes/role");
const userRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const commentsRouter=require("./routes/comments")
const cartRouter = require("./routes/cart");


// Routes Middleware
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/categories", categoriesRouter);
app.use("/products",productsRouter)
app.use("/comments",commentsRouter)
app.use("/cart",cartRouter);



// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
