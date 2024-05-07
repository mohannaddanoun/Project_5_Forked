const { pool } = require("../models/db");
const bcrypt = require(process.env.bcrypt);
const jwt = require("jsonwebtoken");

// This function creates (new user)
const register = (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id = 5 } = req.body;

  // Check if email exists
  pool.query('SELECT * FROM users WHERE email = $1', [email])
    .then(result => {
      if (result.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: "The email already exists"
        });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to hash password"
          });
        }

        // Insert the user with hashed password
        pool.query(`INSERT INTO users (firstName, lastName, age, country, email, password, role_id)
          VALUES ($1, $2, $3, $4, LOWER($5), $6, $7)`, [firstName, lastName, age, country, email.toLowerCase(), hashedPassword, role_id])
          .then(() => {
            res.status(201).json({
              success: true,
              message: "Account created successfully"
            });
          })
          .catch(err => {
            res.status(500).json({
              success: false,
              message: err.message
            });
          });
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
};

const login = (req, res) => {
    const {email,password} = req.body;

    pool.query('SELECT * FROM users WHERE email = LOWER($1)', [email]).then(async(result)=>{
      if(!(result.rows.length>0)){
        return(
          res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          })
        )
      }

      try{

        const valid = await bcrypt.compare(password, result.rows[0].password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result.rows[0].id,
          role: result.rows[0].role_id,
          country: result.rows[0].country,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });

      }catch(err){
        console.log(err.message);
      }
    }).catch((err)=>{
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      })
    })

  };
  

module.exports = {
  register,
  login,
};
