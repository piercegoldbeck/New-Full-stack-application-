const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating a new product schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
 
});

//this will export the product model and will allow it to be accessed in the index.js file
module.exports = mongoose.model("product", productSchema);
