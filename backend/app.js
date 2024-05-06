const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT ;
require("./models/db")


//built in middleware
app.use(express.json());




app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`);
})