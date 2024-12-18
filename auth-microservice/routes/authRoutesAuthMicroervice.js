const express = require('express');
const router = express.Router();
const auth = require('../../shared/middleware/auth-jwt.js');


const roleAuthorization = require('../../shared/middleware/role.js');
const { register, login } = require('../controllers/authController.js');


/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                          - role
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: johndoe
 *                              description: The unique username for the user
 *                          email:
 *                              type: string
 *                              format: email
 *                              example: johndoe.example.com
 *                              description: The email address of the user
 *                          password:
 *                              type: string
 *                              format: password
 *                              example: "password123"
 *                              description: The password for the user
 *                          role:
 *                              type: string
 *                              enum: [host, guest]
 *                              example: guest
 *                              description: The role of the user, either "host" or "guest"
 *      responses:
 *          201:
 *              description: User registered successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *          400:
 *              description: User already exists
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "User already exists"
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal server error"
 */

router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Login a user
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                              example: johndoe.example.com
 *                              description: The user's email address
 *                          password:
 *                              type: string
 *                              format: password
 *                              example: "password123"
 *                              description: The user's password
 *      responses:
 *          200:
 *              description: User logged in successfully
 *              content:
 *                  application/json:
 *                      example:
 *                          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *          400:
 *              description: Invalid credentials
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Invalid credentials"
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal server error"
 */

router.post('/login', login);


/**
 * @swagger
 * /protected:
 *  get:
 *      summary: Protected route for admin users
 *      tags: [Admin]
 *      security:
 *          - bearerAuth: []  
 *      responses:
 *          200:
 *              description: Access granted for admin users
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: "This is a protected route for admin users."
 *          403:
 *              description: Access denied due to insufficient permissions
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: "Access denied: Insufficient permissions"
 *          401:
 *              description: Unauthorized, token missing or invalid
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: "Token is not valid"
 */
router.get('/protected', auth, roleAuthorization(['admin']), (req, res) => {
  res.json({ msg: 'This is a protected route for admin users.' });
});

module.exports = router;
