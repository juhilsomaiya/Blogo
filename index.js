const express = require("express");
const bdyParser = require("body-parser");
const app = express();
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
const blog = require('./app/controllers/blog.controller.js');

app.use(bdyParser.urlencoded({ extended: true }));
app.use(bdyParser.json());

mongoose.connect(dbConfig.dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully conncected to the database.");
}).catch(err => {
    console.log("Something wrong happned.", err);
});

app.get('/', (req, res) => {
    res.send("This is working.!!");
});

app.post('/new', blog.create);

app.get('/blogs', blog.findAll);

app.get('/blog/:id', blog.findOne);

app.delete('/blog/:id', blog.deleteOne);

app.put('/blog/:id', blog.updateOne);

app.listen(5000, () => {
    console.log("Server is started on port 5000..!!");
})
