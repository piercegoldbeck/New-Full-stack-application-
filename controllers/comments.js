const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();

//this post route allows me to create a new comment
router.post("/new", (req, res) => {
    Comment.create(req.body, (err, comment) => {
      res.redirect("/");
    });
  });

//this route allows me to delete a comment by id on the index page and then go back to the orginal index page

router.delete("/:id", (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    res.redirect("/");
  });
});




module.exports = router;
