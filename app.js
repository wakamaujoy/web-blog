//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { includes, each } = require("lodash");
const trendNews = require(__dirname+"/f.js")
const _ = require('lodash');
const mongoose = require("mongoose");
// const getTrends = require("./f");


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

mongoose.connect('mongodb://127.0.0.1:27017/blogdb')


const blogSchema =new mongoose.Schema({
  title:String,
  post:String,
  date :String,
  image: String,
})
const BlogPost = mongoose.model("post", blogSchema)


app.get("/", (req, res)=>{ 
  BlogPost.find({}, (err, respo)=>{
    if(!err){
      res.render("home", {posts:respo})
    }  
}) 
})

app.get("/posts/:mypath", (req, res)=>{   
var url = 'https://newsapi.org/v2/everything?' +
'q=technology&'+    
'sortBy=popularity&' +
'apiKey=744dc8784e464a7b8bdaddacf216f944';
let nowpath =req.params.mypath
BlogPost.findOne({title:nowpath}, (err, answer)=>{
  if(!err){
    const getTrends=  async function() {
      const resp = await fetch(url)
      if (resp.ok) {
        const data = await resp.json()
        const mydata= data.articles.slice(0,5)
        res.render("post", {title: answer.title, body:answer.post, trends:mydata})
      }
      }
    
    getTrends()
  }
  })
})


// app.get("/about", (req, res)=>{
//   res.render("about")

// })

app.get("/contact", (req, res)=>{
  res.render("contact")

})

app.get("/compose", (req, res)=>{
  res.render("compose")

})

app.post("/compose", (req, res)=>{
  const newPost =  new BlogPost({
    title:req.body.newBlog,
    post: req.body.newText,
    date:req.body.newDate,
    image:req.body.newImage
  })
 
  newPost.save()
  res.redirect("/")
  

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
