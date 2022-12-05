// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
const methodOverride = require("method-override");
const express = require("express");
const app = express();
require('dotenv').config()
const port = process.env.port;
require("./models/index")
const Product = require("./models/product");
const Comment = require("./models/comment");
// access controllers
const productsCtrl = require("./controllers/products.js");
const commentsCtrl = require("./controllers/comments.js");
// +-+-+-+-+-+-+-+-+-+-+
// |M|I|D|D|L|E|W|A|R|E|
// +-+-+-+-+-+-+-+-+-+-+
// set folder for static files
// app.use(express.static('public'))
// sets the view engine to EJS for our app (this allows us to render EJS files without usind `.ejs` after file names)
app.set("view engine", "ejs");
// body parser: used for POST/PUT/PATCH routes: this will take incoming strings from the body that are url encoded and parse them into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
//method overide will convert POST requests from the browser ot another req type: Delete or PUT
app.use(methodOverride("_method"));
app.use(express.json());




// +-+-+-+-+-+-+
// |R|O|U|T|E|S|
// +-+-+-+-+-+-+
// Index Route (GET/Read): We'll leave this route in the server.js since it affects both models
app.get("/", (req, res) => {
  Comment.find({}, (err, comments) => {
    res.render("index", { comments });
  })
});

// seed data included all you have to do is type in /seed in order to gather the data in the 
app.get("/seed", async (req, res) => {
  Product.create(
    [
      {
        name: "KasKade",
        description: "This demonstated the peace and tranquility of the ocean",
        img: "https://i.imgur.com/569TYsz.jpg",
        price: 500,
        qty: 1,
      },
      {
        name: "Up Above and Beyond",
        description:
          "This gathers a perspective of being generally high on life",
        img: "https://i.imgur.com/H5RsJcj.jpg",
        price: 250,
        qty: 1,
      },
      {
        name: "This photo is fake",
        description: "https://i.imgur.com/g3rRU4G.jpg",
        img: "This demonstrates the artistic creativity when applying photoshop to a picture",
        price: 600,
        qty: 1,
      },
      {
        name: " The PriceiZControll3dby U",
        description:
          "I guess this looks really cool but how much is it really worth",
        img: "https://i.imgur.com/sNcoI4k.jpg",
        price: 6000,
        qty: 1,
      },
    ],
    (error, data) => {
      res.redirect("/");
    }
  );
});
// All routes affecting the product model: This tells our app to look at the `controllers/products.js` file to handle all routes that begin with `localhost:3000/location`

app.use("/products", productsCtrl);

// All routes affecting the comment model: This tells our app to look at the `controllers/comments.js` file to handle all routes that begin with `localhost:3000/entry`
app.use("/comments", commentsCtrl);

// +-+-+-+-+-+-+-+-+
// |L|I|S|T|E|N|E|R|
// +-+-+-+-+-+-+-+-+
// `app.listen()` binds and listens for the connections on the specified host and port
app.listen(port, () => {
  console.log(`App is running at localhost:${port}`);
});
