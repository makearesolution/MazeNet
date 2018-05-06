var express = require("express");

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


app.get("/addNews",function(req,res){
    res.render("addNews.ejs");
	//hi
});

app.post("/addNews",function(req,res){
    var title =req.body.title;
    var imgUrl =req.body.url;
    var newPost = {title:title, imgUrl: imgUrl};
    news.push(newPost);
    res.redirect("/");
});

// Post /users
app.post('/users', (req, res) => {
    let info = _.pick(req.body, ['email', 'password']);
    let user = User(info);

    user.save()
        .then((user) => {
            return user.generateAuthToken();
        })
        .then((token) => {
            res.header('x-auth', token).send(user);
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

