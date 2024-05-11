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
// This function returns the comments by product Id

const getCommentsByProduct =(req,res)=>{

  const productId= req.params.id
  const isDeleted=0 
  pool.query(`SELECT comments.comment , comments.product_id , comments.commenter_id ,users.userName 
  FROM comments
  INNER JOIN users ON comments.commenter_id=users.id
  WHERE comments.product_id= $1 AND comments.is_deleted = $2`,[productId,isDeleted])
  .then((result) => {
    if (!result.rows.length) {
      res.status(404).json({
        success: false,
        message: `No comment yet for product: ${productId} `,
      });
    } else {
    res.status(200).json({
      success: true,
      message: `All comments for product: ${productId}`,
      comments: result.rows
    });
  }
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: err.message
    });
  });




}

// This function delete the comment by Id

const deleteCommentById =(req,res)=>{
  const commentId=req.params.id
  const isDeleted=1

  pool.query(`UPDATE comments 
  set is_deleted=$1 
  WHERE id=$2 RETURNING *`,[isDeleted,commentId])
  .then((result)=>{
    res.status(200).json({
      success:true,
      message:`Comment:${commentId} deleted successfully`,
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
    createNewComment,
    getCommentsByProduct,
    deleteCommentById

}