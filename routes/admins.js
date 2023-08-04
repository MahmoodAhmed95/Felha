var express = require("express");
var router = express.Router();
const upload = require("../utils/multer");

const adminsCtrl = require("../controllers/admins");

// =========================================================================================
// =========================================================================================

// Start "Dashboard" Routes

    // Get "Dashboard" Page
    router.get("/", adminsCtrl.index);

// End "Dashboard" Routes

// =========================================================================================
// =========================================================================================

// Start "Categories" Routes

    // Get "Categories Control" Page
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
    // router.get("/categories/:id", adminsCtrl.showCategroyEvents);

// End of "Categories" Routes

// =========================================================================================
// =========================================================================================

// Start "Events" Routes

    //New Event Route to display the form
    router.get("/events", adminsCtrl.indexEvents);

    //Creating event Route
    router.post("/events",upload.single("image"), adminsCtrl.createEvent);

    router.get("/events/ajaxSuggest/:id", adminsCtrl.eventSuggestAjax);

    router.get("/events/ajaxEvent/:id", adminsCtrl.eventAjax);

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

// End of "Events" Routes

// =========================================================================================
// =========================================================================================

module.exports = router;
