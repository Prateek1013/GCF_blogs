const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = new schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
  })
  module.exports = mongoose.model('Blog', blogSchema);