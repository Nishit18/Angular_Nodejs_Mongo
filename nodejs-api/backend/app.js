const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://admin:Y6QwIeAM8T8aVOIK@cluster0-otdjn.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database !');
    })
    .catch((error) => {
        console.log('Connection fail !');
    });

//admin
//Y6QwIeAM8T8aVOIK
// app.use((req,res,next)=>{
//     console.log('First middleware');
//     next();
// });

// app.use((req,res,next)=>{
//     res.send('Hello from express!');
// });

// For convert request data in to json from stream of strings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// For enable cors policy
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
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

app.get('/api/posts', (req, res, next) => {
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

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted successfully"
        });
    });
});

module.exports = app;
