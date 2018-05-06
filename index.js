var express = require("express");

var bodyParser = require('body-parser');


var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));    

app.use(express.static("public"));

var news = [{title: "Math",imgUrl:"post (1).jpg"},
            {title: "Physic",imgUrl:"post (2).jpg"}];

app.get("/",function(req,res){
   res.render("index.ejs",{posts:news}); 
});


app.get("/addNews",function(req,res){
    res.render("addNews.ejs");
});

app.post("/addNews",function(req,res){
    var title =req.body.title;
    var imgUrl =req.body.url;
    var newPost = {title:title, imgUrl: imgUrl};
    news.push(newPost);
    res.redirect("/");
});


app.get("/about",function(req,res){
    res.send("about"); 
 });
app.listen(port,function(){
    console.log("server on");
})

