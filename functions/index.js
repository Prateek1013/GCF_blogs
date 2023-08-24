const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const Blog = require('./Model/blog')
const app = express();

const MONGO_URL="mongodb+srv://prateek9771196112:NygzKXgtL3effsJO@cluster0.zxqncfm.mongodb.net/?retryWrites=true&w=majority"

app.use(cors());

mongoose.connect(MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("DB connected");
})
.catch(err=> console.log(err.message));

// api/add?author=name&title=title_name&content=blah_blah
app.get('/api/add', async (req,res) =>{
    try {
        const {author,title,content}=req.query;
        console.log(author);
        const data= await Blog.create({author:author,title:title, content:content});
        return res.json("successfully added the blog!").sendStatus(200);
    } catch (error) {
        console.log(error.message);
    }
})

app.get('/api/blogs',async (req,res)=>{
  try {
    const data= await Blog.find();
    return res.json(data);
} catch (error) {
    console.log(error.message);
}
})

// api/update?findby='author'&val=value_of_findby&author=name&title=fck&content=blah
// here findby can be 'author' or 'title' or 'content'
app.get('/api/update',async (req,res)=>{
    try {
        const {findby,val,author,title,content}=req.query;
        var filter;
        switch (findby) {
            case 'author': 
                filter={author:val}
                break;
            case 'title':
                filter={title:val}
            case 'content':
                filter={content:val}
            default:
                break;
        }
        const update = { author:author, title:title, content:content};
        const doc = await Blog.findOneAndUpdate(filter, update, {
            new: true
          });
        return res.send(doc).sendStatus(200);
    } catch (error) {
        console.log(error.message);
    }
})

// api/delete/findby='author'&val=value_of_findby
app.get('/api/delete',async (req,res)=>{
    try {
        const {findby}=req.query;
        var filter;
        switch (findby) {
            case 'author': 
                filter={author:val}
                break;
            case 'title':
                filter={title:val}
            case 'content':
                filter={content:val}
            default:
                break;
        }
        await Blog.deleteOne(filter);
        return res.send("deleted successfully ").sendStatus(200);
    } catch (error) {
        console.log(error);
    }
})

exports.app = functions.https.onRequest(app);