const { pool } = require("../models/db");

// This function creates new Message

const createMessage = (req, res) => {
  const user_email=req.token.userEmail;
    console.log(user_email);
  const { user_name, user_title, user_message} = req.body;

  pool
    .query(`INSERT INTO messages (user_name,
    user_email,
    user_title,
    user_message) VALUES ($1,$2,$3,$4) RETURNING *;`, [ user_name,user_email,user_title,user_message])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Message send successfully`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server error`,
        err: err.message,
      });
    });
};


const getAllMessages = (req, res) => {
  pool
    .query(`SELECT * FROM messages  a WHERE a.is_deleted=0;`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All Messages",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};



module.exports = {
  createMessage,
  getAllMessages,
};
