var express = require("express");
var router = express.Router();

const adminsCtrl = require("../controllers/admins");

/* GET home page. */
router.get("/", adminsCtrl.index);

/*

Categories edit and create routes

*/

//New Category Route to display the form
router.get("/categories", adminsCtrl.categoryForm);


router.get("/categories/ajaxUpdate/:id", adminsCtrl.editCategoryAjax);

router.get("/categories/ajaxDelete/:id", adminsCtrl.deleteCategoryAjax);

//Creating category Route
router.post("/categories", adminsCtrl.createCategory);

//Updating the category data -> database
router.put("/categories/update/:id", adminsCtrl.updateCategoryForm);

//deleting the category
router.delete("/categories/delete/:id", adminsCtrl.deleteCategory);

//New Category Route to display the form
router.get("/categories/:id", adminsCtrl.showCategroyEvents);
/*

Events edit and create routes

*/

//New Event Route to display the form
router.get("/events", adminsCtrl.eventForm);

//Creating event Route
router.post("/events", adminsCtrl.createEvent);
//Editting the event data -> form
router.get("/events/edit/:id", adminsCtrl.editEventForm);

//Updating  event data -> database
router.put("/events/update/:id", adminsCtrl.updateEventForm);
// // reviews add for the reviews section
// router.post("/:id/reviews", adminsCtrl.create);

//Creating event Route
router.get("/events/:id", adminsCtrl.showOne);

//deleting the event
router.delete("/events/delete/:id", adminsCtrl.deleteEvent);
module.exports = router;
