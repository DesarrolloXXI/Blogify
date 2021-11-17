const express = require("express");
const router = express.Router();

const PostController = require("../controllers/posts");

router.get("", PostController.getPosts);
router.post("", PostController.addPost);
router.delete("/:id", PostController.deletePost);
router.put("/:id", PostController.updatePost);

module.exports = router;
