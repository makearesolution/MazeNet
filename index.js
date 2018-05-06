var express = require("express");
var User = require("./models/user").User;
var bodyParser = require('body-parser'),
    mongoose = require("mongoose");
var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/mazenet");


var news = [{title: "Math",imgUrl:"post (1).jpg"},
            {title: "Physic",imgUrl:"post (2).jpg"}];

app.get("/",function(req,res){
   res.render("index.ejs",{posts:news});
});

app.post("/",function(req,res){
   res.render("index.ejs",{posts:news});
});

app.get("/addNews",function(req,res){
    res.render("addNews.ejs");
	//hi
});
app.get('/adduser',(req,res)=>{
  res.render('newuser.ejs');
});
app.post("/addNews",function(req,res){
    var title =req.body.title;
    var imgUrl =req.body.url;
    var newPost = {title:title, imgUrl: imgUrl};
    news.push(newPost);
    res.redirect("/");
});

// Post /users
app.post('/adduser', (req, res) => {
    var info = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // password: req.body.password
    };
    var user = User(info);
    console.log(info);
    console.log(user);

    user.save()
        .then((user) => {
          res.send(user);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});


app.get("/about",function(req,res){
    res.send("about");
 });
app.listen(port,function(){
    console.log("server on");
})
