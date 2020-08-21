const mongoose = require('mongoose');
// schema is the thing that is going to define the structure of documents that we're going to store inside a collection 
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog',blogSchema);
module.exports=Blog;



