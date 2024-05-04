const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
require("./models/db")


//built in middleware
app.use(express.json());




app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
})