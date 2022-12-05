const express = require("express");
const Product = require("../models/product");
const Comment = require("../models/comment");
const router = express.Router();

//this route allows me to go to the products new page

router.get("/newProduct", (req, res) => {
  res.render("products/newProduct", { product: new Product() });
});

//this route allows me to go to the all products/image gallery page

router.get("/all", (req, res) => {
  Product.find({}, (err, products) => {
    res.render("products/allProducts", { products });
  });
});

// // this route allows me to go to the gallery edit page
router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("products/editProduct", { product: product, });
  });
});

//this get route takes me to a gallery show page
router.get("/:id/show", (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    res.render("products/showProduct", { product: product });
  });
});

//this post route allows me to create a new gallery

router.post("/:id", (req, res) => {
  Product.create(req.body, (err, product) => {
    res.redirect("/products/all");
  });
});

//this put route allows me to update a gallery model and then saves the new gallery and then redirects me to the gallery show page
router.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, product) => {
      console.log('error', err)
      res.redirect("/products/all");
    }
  );
});

//this route allows me to delete a product by id on the index page and then go back to the orginal index page

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    res.redirect("/products/all");
  });
});

module.exports = router;
