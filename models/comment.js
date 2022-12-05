const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating a new product schema

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
});

//this will export the product model and will allow it to be accessed in the index.js file
module.exports = mongoose.model("comment", commentSchema);
