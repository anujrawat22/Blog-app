const express = require("express")
const { Connection } = require("./config/db")
require("dotenv").config()
const cors = require("cors")
const { UserRouter } = require("./routes/UserRoute")
const { PostRouter } = require("./routes/PostRoute")
const { CommentRouter } = require("./routes/CommentRoute")
const app = express()
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog app Docs',
            version: '1.0.2',
        },
        servers: [
            {
                url: 'https://blog-o22i.onrender.com', // Your base URL
            },
        ],
    },
    apis: ['./routes/*.js'] // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.get("/api", (req, res) => {
    res.redirect('/api-docs')
    res.status(200).send('<h1>Welcome to blog application backend</h1>')
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api/users", UserRouter)
app.use("/api/posts", PostRouter)
app.use("/api/comments", CommentRouter)

app.listen(port, async () => {
    try {
        await Connection;
        console.log('Connected to DB');
        console.log(`Listening on PORT - ${port}`);
    } catch (error) {
        console.log(error);
    }
})