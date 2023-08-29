const { Router } = require('express')
const { authenticate } = require('../middlewares/authenticateMiddleware')
const { authorize } = require('../middlewares/authorizeMiddleware')
const { allpost, getpostbyid, createpost, updatepost, deletepost, userPost, searchPost } = require('../controllers/PostController')
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: APIs for managing posts
 */


const PostRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     PostData:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 */

/**
 * @swagger
 * /api/posts/getPosts:
 *   get:
 *     summary: Get all posts with optional pagination
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts per page
 *     responses:
 *       '200':
 *         description: Retrieved list of posts
 *       '500':
 *         description: Server error
 */

PostRouter.get("/getPosts", allpost)



/**
 * @swagger
 * /api/posts/post/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to retrieve
 *     responses:
 *       '200':
 *         description: Retrieved post details
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Server error
 */
PostRouter.get("/post/:id", getpostbyid)

/**
 * @swagger
 * /api/posts/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostData'
 *     responses:
 *       '201':
 *         description: New post created
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Server error
 */
PostRouter.post("/create", authenticate, authorize(['author']), createpost)

/**
 * @swagger
 * /api/posts/update/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostData'
 *     responses:
 *       '204':
 *         description: Post updated
 *       '400':
 *         description: Invalid request body or post not found
 *       '500':
 *         description: Server error
 */

PostRouter.put("/update/:id", authenticate, authorize(['author']), updatepost)

/**
 * @swagger
 * /api/posts/delete/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       '204':
 *         description: Post deleted successfully
 *       '401':
 *         description: Unauthorized or post not owned by user
 *       '404':
 *         description: Post with the specified ID not found or not owned by user
 *       '500':
 *         description: Server error
 */

PostRouter.delete("/delete/:id", authenticate, authorize(['author']), deletepost)

/**
 * @swagger
 * /api/posts/userPost:
 *   get:
 *     summary: Get posts of the authenticated user.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts belonging to the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: All posts of the user
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PostData'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */


PostRouter.get("/userPost", authenticate, authorize(['author']), userPost)

/**
 * @swagger
 * /api/posts/search:
 *   get:
 *     summary: Search for posts by title
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         description: The search query for the title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with matching posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PostData'
 *       404:
 *         description: Invalid or missing query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 */

PostRouter.get("/search", searchPost)

module.exports = { PostRouter }