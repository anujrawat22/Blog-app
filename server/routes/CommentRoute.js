const { Router } = require("express")
const { authorize } = require("../middlewares/authorizeMiddleware")
const { authenticate } = require("../middlewares/authenticateMiddleware")
const { commentsofPost, getCommentbyId, createComment, updateComment, deleteComment } = require("../controllers/CommentController")


const CommentRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ID of the comment
 *         text:
 *           type: string
 *           description: The text content of the comment
 *         author:
 *           type: string
 *           description: The ID of the comment's author
 *         post:
 *           type: string
 *           description: The ID of the associated post
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentCreateRequest:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: The text content of the comment
 *         post:
 *           type: string
 *           description: The ID of the associated post
 *       required:
 *         - text
 *         - post
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     CommentUpdateRequest:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: The updated text content of the comment
 *       required:
 *         - text
 */


/**
 * @swagger
 * /api/comments/all/{postId}:
 *   get:
 *     summary: Get comments of a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to get comments for
 *     responses:
 *       '200':
 *         description: Comments of the post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentData'
 *       '500':
 *         description: Server error
 */
CommentRouter.get("/all/:postId", commentsofPost)


/**
 * @swagger
 * /api/comments/getComment/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to get
 *     responses:
 *       '200':
 *         description: Comment with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentData'
 *       '404':
 *         description: Comment with the specified ID not found
 *       '500':
 *         description: Server error
 */
CommentRouter.get("/getComment/:id", getCommentbyId)


/**
 * @swagger
 * /api/comments/create:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentCreateRequest'
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentData'
 *       '400':
 *         description: Invalid request data
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server error
 */
CommentRouter.post("/create", authenticate, createComment)



/**
 * @swagger
 * /api/comments/edit/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentUpdateRequest'
 *     responses:
 *       '204':
 *         description: Comment updated successfully
 *       '400':
 *         description: Invalid request data
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Comment with the specified ID not found
 *       '500':
 *         description: Server error
 */
CommentRouter.put("/edit/:id", authenticate, updateComment)


/**
 * @swagger
 * /api/comments/delete/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       '204':
 *         description: Comment deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Comment with the specified ID not found for the user
 *       '500':
 *         description: Server error
 */
CommentRouter.delete("/delete/:id", authenticate, deleteComment)



module.exports = { CommentRouter }