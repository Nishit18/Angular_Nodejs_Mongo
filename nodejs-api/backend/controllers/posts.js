const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    //const post = req.body;
    // console.log(post);

    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });
    post.save().then(result => {
        res.status(201).json({
            message: "Post added successfully",
            post: {
                ...result,
                id: result._id
            }
        });
    })
        .catch(error => {
            res.status(500).json({
                message: "Creating a post failed!"
            });
        });
};

exports.getPosts = (req, res, next) => {
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

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchPosts;

    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    postQuery.then(documents => {
        fetchPosts = documents;
        return Post.count();
    }).then(count => {
        res.status(200).json(
            {
                message: "Posts fetched successfully",
                posts: fetchPosts,
                maxPosts: count
            }
        );
    })
        .catch(error => {
            res.status(500).json(
                {
                    message: "Fetching posts failed!",
                }
            );
        });
};

exports.deletePost = (req, res, next) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        // console.log(result);
        if (result.n > 0) {
            res.status(200).json({ message: "Post deleted successfully" });
        }
        else {
            res.status(401).json({ message: "Not authorized!" });
        }
    }).catch(error => {
        res.status(500).json(
            {
                message: "Delete post action failed!",
            }
        );
    });
};

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
        // console.log(result);
        if (result.nModified > 0) {
            res.status(200).json({ message: "Update successful!" });
        }
        else {
            res.status(401).json({ message: "Not authorized!" });
        }
    })
        .catch(error => {
            res.status(500).json({ message: "Couldn't update post!" });
        });
};

exports.getPost = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ message: 'Post not found!' });
        }
    })
        .catch(error => {
            res.status(500).json(
                {
                    message: "Fetching post failed!",
                }
            );
        });
};