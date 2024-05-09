const { pool } = require("../models/db");

// this function create new comment 

const createNewComment = (req,res)=>{

    const{comment}=req.body
    const product_id=req.params.id
    const commenter_id=req.token.userId

    pool.query(`INSERT INTO comments (comment,product_id,commenter_id) VALUES ($1,$2,$3) RETURNING *`,[comment,product_id,commenter_id])
    .then((result)=>{
        res.status(200).json({
          success:true,
          message:`Comment created successfully`,
          result:result.rows
        })
    
      }).catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server error`,
          err: err.message,
        });
      });


}


module.exports ={
    createNewComment

}