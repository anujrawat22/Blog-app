const { Comment } = require("../models/CommentModel");

exports.commentsofPost = async (req, res) => {
    const { postId } = req.params;
    try {

        const comments = await Comment.find({ post: postId }).populate('author', 'username')
        res.status(200).send({ msg: `Comments of post with id - ${postId}`, data: comments })
    } catch (error) {
        console.log(`Error getting comments of postid - ${postId} :`, error);
        res.status({ err: "Server error" })
    }
}

exports.getCommentbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).send({ err: `No comment with id - ${id} found` })
        }
        return res.status(200).send({ msg: `Comment with id - ${id}`, data: comment })
    } catch (error) {
        console.log(`Error getting comment with id -${id} :`, error);
        res.status(500).send({ err: "Server error" })
    }
}


exports.createComment = async (req, res) => {
    const { text, post } = req.body;
    const userId = req.userId;
    try {
        const comment = new Comment({ post, author: userId, text })
        await comment.save()
        await comment.populate("author", 'username')
        res.status(201).send({ msg: "Comment created succesfully", data: comment })
    } catch (error) {
        console.log("Error creating the comment : ", error);
        res.status(500).send({ err: "Server error" })
    }
}


exports.updateComment = async (req, res) => {
    const { text } = req.body;
    const userId = req.userId;
    const { id } = req.params;
    try {
        const comment = await Comment.findOne({ _id: id, author: userId })
        if (!comment) {
            return res.status(404).send({
                err: `No comment with id - ${id} found`
            })
        }
        comment.text = text;
        await comment.save()
        res.status(204).send({ msg: "Comment updated" })
    } catch (error) {
        console.log("Error updating the comment :", error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.deleteComment = async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    try {
        const comment = await Comment.findOne({ _id: id, author: userId })
        if (!comment) {
            return res.status(404).send({ err: "Comment not found for the user" })
        }
        await Comment.findByIdAndDelete(id)
        res.status(204).send({ msg: "Commented deleted succesfully" })
    } catch (error) {
        console.log(`Error deleting the comment :`, error);
        res.status(500).send({ err: "Server error" })
    }
}