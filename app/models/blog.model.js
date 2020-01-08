const mongoose = require('mongoose');


/* simple structure for blogs
    title: string,
    content: string
*/
const blogSchema = mongoose.Schema({
    title: String, 
    content: String
});

module.exports = mongoose.model('Blog', blogSchema);