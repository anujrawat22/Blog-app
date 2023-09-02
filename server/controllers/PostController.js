
const { Comment } = require("../models/CommentModel");
const { Post } = require("../models/PostModel");
const { User } = require("../models/UserModel");

exports.allpost = async (req, res) => {

    let page = parseInt(req.query.page)
    try {
        let order = parseInt(req.query.order) || -1

        let posts;
        if (page) {
            posts = await Post.find({}).sort({ createdAt: order }).populate('author', 'username').skip((page - 1) * 15).limit(15)
        } else {
            page = 1
            posts = await Post.find({}).sort({ createdAt: order }).populate('author', 'username').skip((page - 1) * 15).limit(15)

        }


        return res.status(200).send({ msg: "All posts data", data: posts })

    } catch (error) {
        console.log("Error getting data of all posts:", error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.getpostbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('author', 'username')
        if (!post) {
            return res.status(404).send({ err: `Posts with id -${id} not found` })
        }
        res.status(200).send({ msg: `Data for post with id - ${id}`, data: post })
    } catch (error) {
        console.log(`Error getting post data for id - ${id} : `, error)
        res.status(500).send({ err: "Server error" })
    }
}


exports.createpost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId
    try {
        const newPost = new Post({ title, content, author: userId })
        await newPost.save()
        await newPost.populate('author', 'username')
        res.status(201).send({ msg: "New post created", data: newPost })
    } catch (error) {
        console.log("Error creating the post : ", error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.updatepost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId

    try {
        const post = await Post.findOne({ _id: id, author: userId })
        if (!post) {
            return res.status(404).send({ err: `No post with id - ${id} found` })
        }
        post.title = title
        post.content = content
        await post.save()
        await post.populate('author', 'username')
        res.status(200).send({ msg: "Post updated", post })
    } catch (error) {
        console.log(`Error updating post with  id - ${id} :`, error);
        res.status(500).send({ err: "Server error" })
    }
}


exports.deletepost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const post = await Post.findOne({ _id: id, author: userId })
        if (!post) {
            return res.status(404).send({ err: "No post of the author found" })
        }
        await Post.findByIdAndDelete(id)
        await Comment.deleteMany({post : id})
        res.status(204).send({ msg: `Post with id - ${id} deleted successfully` })
    } catch (error) {
        console.log(`Error deleting post with id - ${id} :`, error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.userPost = async (req, res) => {
    const userId = req.userId
    try {
        const posts = await Post.find({ author: userId }).populate('author', 'username').sort({ createdAt: -1 })
        res.status(200).send({ msg: "All posts of data", data: posts })
    } catch (error) {
        console.log("Error getting post of the user :", error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.searchPost = async (req, res) => {
    const { title, author, page, order } = req.query
    try {
        let currentPage = parseInt(page) || 1
        let sortOrder = parseInt(order) || -1
        let posts;
        if (!title && !author) {
            posts = await Post.find({}).populate('author', 'username').skip((currentPage - 1) * 15).limit(15)
        } else {

            if (title) {
                posts = await Post.find({ title: { "$regex": title, $options: 'i' } }).sort({ createdAt: sortOrder }).populate('author', 'username').skip((currentPage - 1) * 15).limit(15)
            } else if (author) {
                posts = await Post.find({
                    author: {
                        $in: await User.find({ username: { $regex: author, $options: 'i' } }).distinct('_id'),
                    },
                }).sort({ createdAt: sortOrder }).populate('author', 'username').skip((currentPage - 1) * 15).limit(15);
            }
        }
        res.status(200).send({ msg: "Posts response according to query", data: posts })
    } catch (error) {
        console.log(error);
        res.status(500).send({ err: "Server error" })
    }
}