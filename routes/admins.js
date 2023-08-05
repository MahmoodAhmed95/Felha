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
    router.get("/categories", adminsCtrl.categoryIndex);

    // get categories by Ajax
    router.get("/categories/ajaxCategory/:id", adminsCtrl.categoryAjax);

    //Creating category Route
    router.post("/categories", adminsCtrl.createCategory);

    //Updating the category data -> database
    router.put("/categories/update/:id", adminsCtrl.updateCategoryForm);

    //deleting the category
    router.delete("/categories/delete/:id", adminsCtrl.deleteCategory);

// End of "Categories" Routes

// =========================================================================================
// =========================================================================================

// Start "Events" Routes

    //New Event Route to display the form
    router.get("/events", adminsCtrl.eventsIndex);

    //Creating event Route
    router.post("/events",upload.single("image"), adminsCtrl.createEvent);

    //get Suggestes by Ajax
    router.get("/events/ajaxSuggest/:id", adminsCtrl.eventSuggestAjax);

    //get Events by Ajax
    router.get("/events/ajaxEvent/:id", adminsCtrl.eventAjax);

    //Updating  event data -> database
    router.put("/events/update/:id",upload.single("image"), adminsCtrl.updateEventForm);

    //deleting the event
    router.delete("/events/delete/:id", adminsCtrl.deleteEvent);

// End of "Events" Routes

// =========================================================================================
// =========================================================================================

// Start "Suggestions" Routes

    //New Event Route to display the form
    router.get("/suggestions", adminsCtrl.suggestionsIndex);

    //New Event Route to display the form
    router.get("/suggestions/:id", adminsCtrl.suggestionsDetails);

    //New Event Route to display the form
    router.get("/suggestions/accept/:id", adminsCtrl.suggestionAccept);
    //New Event Route to display the form
    router.get("/suggestions/reject/:id", adminsCtrl.suggestionReject);

// End of "Suggestions" Routes

// =========================================================================================
// =========================================================================================

// Start "Users" Routes

    // to display users table
    router.get("/users", adminsCtrl.usersIndex);

    // to display users table
    router.get("/users/promote/:id", adminsCtrl.userPromote);

    // to display users table
    router.get("/users/demote/:id", adminsCtrl.userDemote);

    // to display users table
    router.get("/users/block/:id", adminsCtrl.userBlock);

// End of "Users" Routes


module.exports = router;
