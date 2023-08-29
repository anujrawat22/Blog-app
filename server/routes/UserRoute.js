const { Router } = require("express")
const { signup, login, getuserdetails, logout } = require("../controllers/UserController")
const cookieParser = require('cookie-parser');

const UserRouter = Router()
UserRouter.use(cookieParser())
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *     LoginCredentials:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: Registration successful
 *       '400':
 *         description: Something went wrong during registration
 *       '401':
 *         description: User already exists, please login
 *       '500':
 *         description: Server error
 */

UserRouter.post("/signup", signup)


/**
 * @swagger
 * api/users/login:
 *   post:
 *     summary: Log in as a user
 *     tags:
 *       - User
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid credentials
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 */
UserRouter.post("/login", login)

UserRouter.get("/logout", logout)

UserRouter.get("/userdetails/:id", getuserdetails)

module.exports = { UserRouter }