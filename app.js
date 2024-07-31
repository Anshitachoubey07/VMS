const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "It will contain the list of Visitors";
const aboutContent = "It will contain the details of all the safety guards";
// const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {firstPara: homeStartingContent, changes: posts});
});

app.get("/about",function(req, res){
  res.render("about", {aboutPara: aboutContent});
});

// app.get("/contact", function(req, res){
//   res.render("contact", {contactPara: contactContent});
// });

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {

    title: req.body.text,
    content: req.body.post,
    floor: req.body.post,
    flat: req.body.post,
    owner: req.body.post

    // name: req.body.text

  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  var requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    var storedTitle = _.lowerCase(post.title);
    // var storedTitle = _.lowerCase(post.name);

    if(storedTitle === requestedTitle){

      res.render("post", {
        title: post.title,
        content: post.content,
        floor: post.floor,
        flat: post.flat,
        owner: post.owner

        // name: post.name
      });

      console.log("Match Found");
    }

  });

});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
