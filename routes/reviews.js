const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// POST /movies/:id/reviews (create review for a movie)
router.post('/events/:id/reviews', reviewsCtrl.create);


module.exports = router;