const { pool } = require("../models/db");

// This function creates new role
const createNewRole = (req, res) => {
  //TODO: write your code here
  const {role} = req.body;

  pool.query(`INSERT INTO roles (role) VALUES ($1) RETURNING *`,[role]).then((result)=>{
    res.status(201).json({
      success:true,
      message:"Role created sucessfully",
      role:result.rows,
    })
  }).catch((err)=>{
    res.status(500).json({
      success:false,
      message:"Server error",
    })
  })
};

// This function creates new permission
const createNewPermission = (req, res) => {
  //TODO: write your code here
};

// This function creates new role permission
const createNewRolePermission = (req, res) => {
  //TODO: write your code here
};

module.exports = {
createNewRole
};
