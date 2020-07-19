const express = require("express");

const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
    //const post = req.body;
    // console.log(post);

    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        res.status(201).json({
            message: "Post added successfully",
            postId: result._id
        });
    });
});

router.get('', (req, res, next) => {
    // const posts = [
    //     {
    //         id: "gfgfvgkygsdfys",
    //         title: "First server side post",
    //         content: "This is a message"
    //     },
    //     {
    //         id: "sdfsdfsdfsd",
    //         title: "Second server side post",
    //         content: "This is a message !"
    //     }
    // ];
    // res.status(200).json(
    //     {
    //         message: "Posts fetched successfully",
    //         posts: posts
    //     }
    // );

    Post.find().then(documents => {
        res.status(200).json(
            {
                message: "Posts fetched successfully",
                posts: documents
            }
        );
    });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted successfully"
        });
    });
});

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: "Update successful!" });
    });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ message: 'Post not found!' });
        }
    })
});

module.exports = router;
