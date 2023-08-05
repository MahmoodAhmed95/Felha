const express = require("express");
const router = express.Router();
const reviewsCtrl = require("../controllers/reviews");

// POST /movies/:id/reviews (create review for a movie)
router.post("/events/:id/reviews", reviewsCtrl.create);

// DELETE /reviews
// router.delete("/reviews/:id", reviewsCtrl.delete);

router.post("/reviews/:id/reviews", ensureLoggedIn, reviewsCtrl.create);
router.delete("/reviews/:id", ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;
