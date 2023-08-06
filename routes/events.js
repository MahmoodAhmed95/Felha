var express = require("express");
var router = express.Router();
const upload = require("../utils/multer");

const eventsCtrl = require("../controllers/events");
const reviewsCtrl = require("../controllers/reviews");
const categoriesCtrl = require("../controllers/categories");

/* GET home page. */
router.get("/", eventsCtrl.index);

// //New Event Route to display the form
// router.get("/new", eventsCtrl.eventForm);

// //Creating event Route
// router.post("/createEvent",upload.single("image"), eventsCtrl.create);
// //Editting the event data -> form
// router.get("/edit/:id", eventsCtrl.editEventForm);

// //Updating  event data -> database
// router.put("/update/:id", eventsCtrl.updateEventForm);
// reviews add for the reviews section
router.post("/:id/reviews", reviewsCtrl.create);
//
// router.get("/:id", eventsCtrl.showCategoryButton);
router.delete("/:id/deletereview", reviewsCtrl.delete);
//Creating event Route
router.get("/:id", eventsCtrl.showOne);

// //deleting the event
// router.delete("/delete/:id", eventsCtrl.deleteEvent);
module.exports = router;
