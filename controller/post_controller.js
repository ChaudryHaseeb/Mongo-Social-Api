const expressAsyncHandler = require("express-async-handler");
const Post = require("../model/Post");
const Comment = require("../model/Comment");



//=============================== POST CREATE API ========================================


//@des create a post
//@routes POST api/post
//@access public


const create = expressAsyncHandler(async (req, res) => {
    const {post, description, location, user_id } = req.body;

    if (!post) {
      res.status(400);
      throw new Error("Post field is mandatory");
    };

    const posts = await Post.create({
        user_id: user_id || "675815c4b6b7cc125cd67b74",
        post,
        description,
        location,
    });
    res.status(200).json({message: "Post Created Succesfully!", posts});
})



//=============================== POST UPDATE API ========================================


//@desc Update a POST by ID
//@route PUT /api/post/:id
//@access public


const update = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { post, description, location } = req.body;

    const posts = await Post.findById(id);
    if (!posts) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (post, description, location){
        posts.post = post;
        posts.description = description;
        posts.location = location;
    }

    const updatedPost = await posts.save();
    res.status(200).json({ message: "Post updated successfully", updatedPost });
});



//=============================== POST DELETE API ========================================


//@desc Delete a post by ID
//@route DELETE /api/post/:id
//@access public


const deletee = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    await Post.deleteOne({ _id: id });
    res.status(200).json({ message: "Post deleted successfully" , post});
});



//=============================== POST GET SPECIFIC POST API ========================================



//@desc Get a specific post by ID
//@route GET /api/post/:id
//@access public


const get_post = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json(post);
});


//=============================== POST ALL POST API ========================================


//@desc Get all posts
//@route GET /api/posts
//@access public


const get_posts = expressAsyncHandler(async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts);
});


//=============================== POST ALL Comment API ========================================


//@desc Get all post comment
//@route GET /api/post/comment/:id
//@access public


const get_post_comment = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const comments = await Comment.find({post_id : id });

    if (!comments) {
        res.status(404);
        throw new Error("Post comments are not found");
    }
    res.status(200).json(comments);


});


module.exports = { create, update, deletee, get_post, get_posts, get_post_comment };