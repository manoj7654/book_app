const express=require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouter");
const { bookRouter } = require("./routes/bookRouter");

const swaggerJsDoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");
const app=express();
require("dotenv").config();
app.use(express.json())


const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "User Api",
            version: "1.0.0",
            description: "API documentation for Book Management",
        },
        servers: [
            {
                url: "http://localhost:4500/"
            }
        ],
    },
    apis: ['./index.js'] // Path to your API endpoints
};


  const swaggerSpec=swaggerJsDoc(options);
  app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

  
  
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The user ID.
 *             name:
 *               type: string
 *               description: The user's name.
 *             email:
 *               type: string
 *               description: The user's email address.
 *             phone:
 *               type: integer
 *               description: The user's phone number.
 *             password:
 *               type: string
 *               description: The user's password.
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - password
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The book ID.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *         publication_year:
 *           type: string
 *           description: The publication year of the book.
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the book.
 *       required:
 *         - title
 *         - author
 *         - publication_year
 *         - userId
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Regisgter a new user
 *     description: This endpoint inserts a new user into the database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request - Invalid input data
 *       '401':
 *         description: Unauthorized - Authentication required
 *       '500':
 *         description: Internal server error - Failed to create user
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and generate a JWT token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user.
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error - Failed to authenticate user
 */

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: Book created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/allbook:
 *   get:
 *     summary: Retrieve all books
 *     tags: [Books]
 *     responses:
 *       '200':
 *         description: A list of books
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/edit/{id}:
 *   patch:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /books/remove/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       '201':
 *         description: Book deleted successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
app.use("/users",userRouter)
app.use("/books",bookRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port no ${process.env.port}`)
})
