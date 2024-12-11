const express = require("express");
const { create, update, deletee, get_comment, get_comments, get_comment_parent } = require("./../controller/comment_controller");


const router = express.Router();


router.post("/comment", create);
router.put("/comment/:id", update);
router.delete("/comment/:id", deletee);
router.get("/comment/:id", get_comment);
router.get("/comments", get_comments);
router.get("/comment/:id/reply", get_comment_parent);



module.exports = router;