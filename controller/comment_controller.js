const expressAsyncHandler = require("express-async-handler");
const Comment = require("../model/Comment");


//=============================== COMMENT CREATE API ========================================


//@des create a comment
//@routes POST api/comment
//@access public


const create = expressAsyncHandler(async (req, res) => {
    console.log("toop-=-----------------")

    const {comment_text, parent_comment_id } = req.body;

    if (!comment_text) {
      res.status(400);
      throw new Error("comment field is mandatory");
    };

    const comments = await Comment.create({
        user_id: "675815c4b6b7cc125cd67b74",
        post_id: "67583043590c4e9838caa8a1",
        comment_text,
        parent_comment_id,
    });
    console.log("&&&&&&&&&&&&&&",comments)
    res.status(200).json({message: "Comment Post Succesfully!", comments});

})



//=============================== COMMENT UPDATE API ========================================


//@desc Update a Comment by ID
//@route PUT /api/Comment/:id
//@access public


const update = expressAsyncHandler(async (req, res) => {
    console.log("toop-=-----------------")
    const { id } = req.params;
    const { comment_text } = req.body;
    console.log("----------",comment_text)

    const Comments = await Comment.findById(id);
    if (!Comments) {
        res.status(404);
        throw new Error("Comment not found");
    }

    if (comment_text){
        Comments.comment_text = comment_text;
    }

    const updatedComment = await Comments.save();
    res.status(200).json({ message: "Comment updated successfully", updatedComment });
});




//=============================== COMMENT DELETE API ========================================


//@desc Delete a comment by ID
//@route DELETE /api/comment/:id
//@access public


const deletee = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const Comments = await Comment.findById(id);
    if (!Comments) {
        res.status(404);
        throw new Error("Comment not found");
    }

    await Comment.deleteOne({ _id: id });
    res.status(200).json({ message: "Comment deleted successfully" , Comments});
});



//=============================== Comment GET SPECIFIC Comment API ========================================



//@desc Get a specific post by ID
//@route GET /api/Comment/:id
//@access public


const get_comment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const Comments = await Comment.findById(id);
    if (!Comments) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json(Comments);
});




//=============================== COMMENT ALL COMMENT API ========================================


//@desc Get all comments
//@route GET /api/coments
//@access public


const get_comments = expressAsyncHandler(async (req, res) => {
    const Comments = await Comment.find();

    res.status(200).json(Comments);
});


//=============================== COMMENT ALL COMMENT REPLY API ========================================


//@desc Get all reply comments
//@route GET /api/comment/reply/:id
//@access public


const get_comment_parent = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.find({ parent_comment_id : id });

    if (!comments) {
        res.status(404);
        throw new Error("reply comments are not found");
    }
    res.status(200).json(comments);


});


module.exports = { create, update, deletee, get_comment, get_comments, get_comment_parent };