const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// const Post = require('./models/post');
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

// mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@cluster0-otdjn.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use("/images", express.static(path.join("backend/images")));

// For enable cors policy
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

// app.post('/api/posts', (req, res, next) => {
//     //const post = req.body;
//     // console.log(post);

//     const post = new Post({
//         title: req.body.title,
//         content: req.body.content
//     });
//     post.save().then(result => {
//         res.status(201).json({
//             message: "Post added successfully",
//             postId: result._id
//         });
//     });
// });

// app.get('/api/posts', (req, res, next) => {
//     // const posts = [
//     //     {
//     //         id: "gfgfvgkygsdfys",
//     //         title: "First server side post",
//     //         content: "This is a message"
//     //     },
//     //     {
//     //         id: "sdfsdfsdfsd",
//     //         title: "Second server side post",
//     //         content: "This is a message !"
//     //     }
//     // ];
//     // res.status(200).json(
//     //     {
//     //         message: "Posts fetched successfully",
//     //         posts: posts
//     //     }
//     // );

//     Post.find().then(documents => {
//         res.status(200).json(
//             {
//                 message: "Posts fetched successfully",
//                 posts: documents
//             }
//         );
//     });
// });

// app.delete('/api/posts/:id', (req, res, next) => {
//     Post.deleteOne({ _id: req.params.id }).then(result => {
//         console.log(result);
//         res.status(200).json({
//             message: "Post deleted successfully"
//         });
//     });
// });

// app.put("/api/posts/:id", (req, res, next) => {
//     const post = new Post({
//         _id: req.params.id,
//         title: req.body.title,
//         content: req.body.content
//     });
//     Post.updateOne({ _id: req.params.id }, post).then(result => {
//         console.log(result);
//         res.status(200).json({ message: "Update successful!" });
//     });
// });

// app.get("/api/posts/:id", (req, res, next) => {
//     Post.findById(req.params.id).then(post => {
//         if (post) {
//             res.status(200).json(post);
//         }
//         else {
//             res.status(404).json({ message: 'Post not found!' });
//         }
//     })
// });

app.use("/api/posts/", postRoutes);
app.use("/api/user/", userRoutes);

module.exports = app;
