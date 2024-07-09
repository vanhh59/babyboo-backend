// import { isValidObjectId } from "mongoose";

// import { isValidObjectId } from "mongoose";
const isValidObjectId = require("mongoose");

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object of: ${req.params.id}`);
  }
  next();
}

// export default checkId;

module.exports = checkId;
