const express = require('express');
const router = express.Router();
const auth = require('../../shared/middleware/auth-jwt.js');

const roleAuthorization = require('../../shared/middleware/role');
const { createListing, getMyListings, searchListings, deleteListing } = require('../controllers/listingController');

/**
 * @swagger
 * /api/listings:
 *   post:
 *     summary: Insert a new listing. Can used by user type:"Host". Authentication needed.
 *     tags: [Listings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               no_of_people:
 *                 type: number
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               price:
 *                 type: number
 *               from_date:
 *                 type: string
 *                 format: date
 *                 description: Start date of availability
 *               to_date:
 *                  type: string
 *                  format: date
 *                  description: End date of availability
 *     responses:
 *       201:
 *         description: Listing created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', auth, roleAuthorization(['host']), createListing);

/**
 * @swagger
 * /api/listings/my-listings:
 *   get:
 *     summary: Get all listings created by the logged-in host.
 *     tags: [Listings]
 *     responses:
 *       200:
 *         description: List of listings created by the host
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.get('/my-listings', auth, roleAuthorization(['host']), getMyListings);



/**
 * @swagger
 * /api/listings/search:
 *   get:
 *     summary: No authentication needed.Query Listings by title, date, or place. If no parameters are provided, return all results.
 *     tags: [Listings]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by listing title
 *       - in: query
 *         name: from_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for availability
 *       - in: query
 *         name: to_date
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for availability
 *       - in: query
 *         name: no_of_people
 *         schema:
 *           type: integer
 *         description: Minimum number of people the listing should accommodate
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filter by country
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *     responses:
 *       200:
 *         description: List of matching listings or all listings if no parameters provided
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   no_of_people:
 *                     type: integer
 *                   country:
 *                     type: string
 *                   city:
 *                     type: string
 *                   from_date:
 *                     type: string
 *                     format: date
 *                   to_date:
 *                     type: string
 *                     format: date
 *                   price:
 *                     type: number
 *       500:
 *         description: Server error
 */
router.get('/search', searchListings);

/**
 * @swagger
 * /api/listings/{id}:
 *   delete:
 *     summary: Delete a listing
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The listing ID
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, roleAuthorization(['host']), deleteListing);

module.exports = router;
