const blog = require('../models/blog.model.js');

exports.create = (req, res) => {

    if (!req.body.content) {
        return res.status(400).send({
            message: "You can't create empty blog, please try to insert some content."
        });
    }

    const newBlog = new blog({
        title: req.body.title || "Blog",
        content: req.body.content
    });

    newBlog.save()
        .then(data => {
            res.send({
                message: "Successfully created a blog"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong happend"
            })
        });
};

exports.findAll = (req, res) => {
    blog.find()
        .then(blog => {
            res.send(blog);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "No blogs found.!"
            });
        });

};

exports.findOne = (req, res) => {
    blog.findById(req.params.id)
        .then(blog => {
            res.send(blog);
        }).catch(err => {
            res.status(404).send({
                message: "No blogs found with specified id"
            });
        });
};

exports.deleteOne = (req, res) => {
    blog.findByIdAndDelete(req.params.id)
        .then(blog => {
            if (!blog) {
                res.status(404).send({
                    message: "No blogs found with specified id"
                });
            }
            res.status(200).send({
                message: "Successfully deleted the blog"
            })
        }).catch(err => {
            res.status(404).send({
                message: "Please specify valid id to delete the blog"
            });
        });
};

exports.updateOne = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "You can't update the blog, please try to insert some content."
        });
    }

    blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content
    })
        .then(blog => {
            if (!blog) {
                res.status(404).send({
                    message: "No blogs found with specified id"
                });
            }
            res.status(200).send({
                message: "Successfully updated the blog"
            });
        }).catch(err => {
            res.status(404).send({
                message: "Please specify valid id to update the blog"
            });
        });

};
