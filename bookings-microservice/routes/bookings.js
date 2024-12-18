const express = require('express');
const router = express.Router();
const auth = require('../../shared/middleware/auth-jwt.js');

const roleAuthorization = require('../../shared/middleware/role');
const { createBooking, getBookingsByUser, getAllBookings } = require('../controllers/bookingController');

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Book a stay. Authentication needed. Can used by user type:"Guest".
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               listingId:
 *                 type: string
 *                 description: ID of the listing to book
 *               from_date:
 *                 type: string
 *                 format: date
 *               to_date:
 *                 type: string
 *                 format: date
 *               guest_names:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Names of guests for the booking
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid input or unavailable listing
 *       500:
 *         description: Server error
 */
router.post('/', auth, roleAuthorization(['guest']), createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings for the logged-in guest. Authentication needed.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       listingId:
 *                         type: string
 *                       from_date:
 *                         type: string
 *                         format: date
 *                       to_date:
 *                         type: string
 *                         format: date
 *                       guest_names:
 *                         type: array
 *                         items:
 *                           type: string
 *                       status:
 *                         type: string
 *     500:
 *       description: Server error
 */
router.get('/', auth, roleAuthorization(['guest']), getBookingsByUser);

/**
 * @swagger
 * /api/bookings/admin:
 *  get:
 *      summary: Get all bookings (Admin only)
 *      tags: [Bookings]
 *      security:
 *          - bearerAuth: []   
 *      responses:
 *          200:
 *              description: Successfully retrieved all bookings
 *              content:
 *                  application/json:
 *                      example:
 *                          bookings:
 *                              - _id: "63f1a44a4d35f2cd12345678"
 *                                listingId: "63f1a44a4d35f2cd87654321"
 *                                guestId: "63f1a44a4d35f2cd45678901"
 *                                from_date: "2024-12-20"
 *                                to_date: "2024-12-25"
 *                                guest_names:
 *                                  - "John Doe"
 *                                  - "Jane Doe"
 *                                status: "confirmed"
 *          403:
 *              description: Access denied due to insufficient permissions
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Access denied: Insufficient permissions"
 *          401:
 *              description: Unauthorized, token missing or invalid
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Token is not valid"
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      example:
 *                          message: "Internal server error"
 */

router.get('/admin', auth, roleAuthorization(['admin']), getAllBookings);

module.exports = router;
