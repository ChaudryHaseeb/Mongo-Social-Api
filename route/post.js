const express = require("express");
const { create, update, deletee, get_post, get_posts, get_post_comment } = require("./../controller/post_controller");


const router = express.Router();


router.post("/post", create);
router.put("/post/:id", update);
router.delete("/post/:id", deletee);
router.get("/post/:id", get_post);
router.get("/posts", get_posts);
router.get("/post/:id/comment", get_post_comment);



module.exports = router;