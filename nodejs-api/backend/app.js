const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    const post = req.body;
    console.log(post);
    res.status(201).json({ message: "Post added successfully" });
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: "gfgfvgkygsdfys",
            title: "First server side post",
            content: "This is a message"
        },
        {
            id: "sdfsdfsdfsd",
            title: "Second server side post",
            content: "This is a message !"
        }
    ];
    res.status(200).json(
        {
            message: "Posts fetched successfully",
            posts: posts
        }
    );
});

module.exports = app;
