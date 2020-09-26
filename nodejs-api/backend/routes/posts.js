const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const postsController = require('../controllers/posts');

const router = express.Router();

router.post('', checkAuth, extractFile, postsController.createPost);

router.get('', postsController.getPosts);

router.delete('/:id', checkAuth, postsController.deletePost);

router.put("/:id", checkAuth, extractFile, postsController.updatePost);

router.get("/:id", postsController.getPost);

module.exports = router;
