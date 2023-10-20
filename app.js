//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { includes, each } = require("lodash");
const _ = require('lodash');
const mongoose = require("mongoose");



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


app.get("/", async(req, res)=>{ 
  try{
    const respo= await BlogPost.find({})
    res.render("home", {posts:respo})

  }catch(err){
    console.log(err);

  }
}) 


app.get("/posts/:mypath", async(req, res)=>{   
    try{
      const thePost = await BlogPost.findOne({title:req.params.mypath})    
      res.render("post", {title: thePost.title, body:thePost.post})
      }catch(err){
        console.log(err);
      }
    })

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
