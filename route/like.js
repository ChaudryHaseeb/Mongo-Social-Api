const express = require("express");
const { create, deletee, get_user_like, get_likes, get_post_like, get_post_like_all} = require("../controller/like_controller");


const router = express.Router();


router.post("/like", create);
router.delete("/like/:id", deletee);
router.get("/user/:id/like", get_user_like);
router.get("/likes", get_likes);
router.get("/post/:id/like", get_post_like);
router.get("/posts/likes", get_post_like_all);
// router.get("comment/like/:id", get_comment_like);



module.exports = router;