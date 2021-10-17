//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blogdb", {
  useNewUrlParser: true,
});
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

// let posts = [];

app.get("/", function (req, res) {

Blog.find({}, function(err, foundItem){
  res.render("home", {
    blogs: foundItem,
  });
});


});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/aboutus", function (req, res) {
  res.render("about");
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const blogTitle = _.capitalize(req.body.postTitle);
  const newblog = new Blog({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  newblog.save();
  res.redirect("/");
});
app.get("/:postName", function (req, res) {
  const requestedQuery = req.params.postName;
  Blog.findOne({_id: requestedQuery},function(err,foundItem){
      res.render("post",{
        PostTitle : foundItem.title,
        PostBody : foundItem.content,
      })

  });
});
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
