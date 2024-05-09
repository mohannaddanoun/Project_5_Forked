const {pool} = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const data = [role_id, string];
    const query = `SELECT permission FROM role_permission AS RP INNER JOIN permissions AS P ON RP.permission_id = P.id WHERE RP.id = $1 AND P.permission= $2`;
    console.log(data);
    console.log(query);
    pool
      .query(query,data)
      .then((result) => {
        console.log(result);
        if (result.rows.length) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({ message: "unauthorized" ,err :err})
        console.log(err);
      });
  };
};

module.exports = authorization;
