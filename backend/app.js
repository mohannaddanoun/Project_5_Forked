const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
require("./models/db");

//built in middleware
app.use(express.json());
app.use(cors())
//import routes
const roleRouter = require("./routes/role");
const userRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const commentsRouter=require("./routes/comments")
const cartRouter = require("./routes/cart");
const ordersRouter = require("./routes/orders");


// Routes Middleware
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/categories", categoriesRouter);
app.use("/products",productsRouter)
app.use("/comments",commentsRouter)
app.use("/cart",cartRouter);
app.use("/orders",ordersRouter)


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
