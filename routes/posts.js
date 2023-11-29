const express = require('express');
const { ObjectId } = require('mongodb'); // Import ObjectId
const router = express.Router();

//importing Schema from model folder
const Post = require('../model/postData')

//get all Post
router.get('/', async (req, res) => {
    try {
        const allData = await Post.find();
        res.status(200).send({ success: true, data: allData });
    } catch (err) {
        return res.status(500).json({ success: false, message: err})
    }
});

//Creating or saving Post 
router.post('/create', async (req, res) => {
    const post = new Post(
        {
            title : req.body.title, 
            description : req.body.description
        }
    );
    
    //saving data to database
    try {
        const savedPost = await post.save();
        res.status(200).send({ success: true, data: savedPost });
    } catch (err) {
        return res.status(500).json({ success: false, message: err})
    }
});

//getting Specific post
router.get("/:postId", async (req,res) => {
    try {
        const specificPost = await Post.findById(req.params.postId);
        res.status(200).send({ success: true, data: specificPost });
    } catch (err) {
        return res.status(500).json({ success: false, message: err})
    }
});

router.patch("/update/:postId", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            },
        );

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).send({ success: true, data: updatedPost });
    } catch (err) {
        return res.status(500).json({ success: false, message: err });
    }
});


router.delete("/delete/:postId", async (req, res) => {
    try {
        const removePost = await Post.deleteOne(
            { _id: req.params.postId },
        );

        if (!removePost) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).send({ success: true, data: removePost });
    } catch (err) {
        return res.status(500).json({ success: false, message: err });
    }
});


module.exports = router;