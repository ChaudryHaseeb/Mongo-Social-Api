const expressAsyncHandler = require("express-async-handler");
const User = require("../model/User");
const Post = require("../model/Post");
const Comment = require("../model/Comment");
const Like = require("../model/Like");



//=============================== LIKE CREATE API ========================================


//@des create a like
//@routes POST api/like
//@access public


const create = expressAsyncHandler(async (req, res) => {
    const {user_id, type, resource_id } = req.body;

    if (!type) {
      res.status(400);
      throw new Error("Type field is mandatory");
    };

    const likes = await Like.create({
        user_id: user_id || "675815c4b6b7cc125cd67b74",
        type,
        resource_id: resource_id || "67583af8d67ce755c6990f77",
    });
    res.status(200).json({message: "like Pressed Succesfully!", likes});
})




//=============================== LIKE DELETE API ========================================


//@desc Delete a LIKE by ID
//@route DELETE /api/like/:id
//@access public


const deletee = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const like = await Like.findById(id);
    if (!like) {
        res.status(404);
        throw new Error("Like not found");
    }

    await Like.deleteOne({ _id: id });
    res.status(200).json({ message: "Like Remove successfully" , like});
});



//=============================== LIKE GET SPECIFIC LIKE API ========================================



//@desc Get a specific like by ID
//@route GET /api/user/like/:id
//@access public


const get_user_like = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const like = await Like.find({user_id: id});
    if (!like) {
        res.status(404);
        throw new Error("Like not found");
    }

    res.status(200).json(like);
});



//=============================== LIKE ALL LIKE API ========================================


//@desc Get all like
//@route GET /api/likes
//@access public


const get_likes = expressAsyncHandler(async (req, res) => {
    const likes = await Like.find();

    res.status(200).json(likes);
});



//=============================== LIKE GET SPECIFIC LIKE API ========================================



//@desc Get a specific like by post ID
//@route GET /api/posts/like/:id
//@access public


const get_post_like = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const {type} = req.body;
    if (!type) {
        res.status(400);
        throw new Error("Type field is mandatory");
      };
    const like = await Like.find({type ,resource_id: id});
    if (!like) {
        res.status(404);
        throw new Error("Post or Comment Like not found");
    }
    if (!like.length) {
        res.status(404);
        throw new Error("No likes found for the specified resource");
    }

    res.status(200).json(like);
});




//=============================== LIKE GET SPECIFIC LIKE API ========================================



//@desc Get a specific like by post
//@route GET /api/posts/like
//@access public


const get_post_like_all = expressAsyncHandler(async (req, res) => {
    const { type } = req.body;

    if (!type) {
      res.status(400);
      throw new Error("Type field is mandatory");
    };


    const like = await Like.find({type: type});
    if (!like) {
        res.status(404);
        throw new Error("Post/Comment Like not found");
    }

    res.status(200).json(like);
});





module.exports = { create, deletee, get_user_like, get_likes, get_post_like, get_post_like_all};