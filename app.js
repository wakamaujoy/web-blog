//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { includes, each } = require("lodash");
const _ = require('lodash');
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));



const  mongoDB ="mongodb+srv://wakamaujoy:EDK9XbajYRZBaNSF@cluster0.b5by5vg.mongodb.net/blogdb?retryWrites=true&w=majority"

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


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
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!POSTS SECTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.route("/posts/:mypath")
  .get(async(req, res)=>{   
    
      try{
        nowpost = req.params.mypath
        const thePost = await BlogPost.findOne({title:nowpost})    
        res.render("post", {title: thePost.title, body:thePost.post})
        }catch(err){
          console.log(err);
        }
      })

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!CONTACT SECTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
app.get("/contact", (req, res)=>{
  res.render("contact")

})
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SEARCH SECTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/search/:key", async(req,res)=>{
  let data= await BlogPost.find(
    {
      "$or":[
        {title:{$regex:req.params.key}},
        {post:{$regex:req.params.key}}
      ]
    })
  res.render("searchResults", {posts:data})
})

app.post("/search", (req,res)=>{
  const key =_.toLower(req.body.keyword)
  res.redirect('/search/' +key )
  
})
// / !!!!!!!!!!!!!!!!!!!!!!!!!!!!!COMPOSE SECTION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/compose", (req, res)=>{
  res.render("compose")

})

app.post("/compose",(req, res)=>{
  const newPost =  new BlogPost({
    title:req.body.newBlog,
    post: req.body.newText,
    date:req.body.newDate,
    image:req.body.newImage
  })
  newPost.save()
  res.redirect("/") 

})

// app.patch("/compose/:mypath",async(req, res)=>{     
//   try{
//     nowpost = req.params.mypath
//     const thePost = await BlogPost.findOneAndUpdate({title:nowpost},{$set: req.body})    
//     thePost.save()
//     res.redirect("/")
//     }catch(err){
//       console.log(err);
//     }
//   })

// app.delete("/compose/:mypath",async(req, res)=>{     
//   try{
//     nowpost = req.params.mypath
//     const thePost2 = await BlogPost.deleteOne({title:nowpost})
//     res.redirect("/")
//     }catch(err){
//       console.log(err);
//     }
//   })

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
})
