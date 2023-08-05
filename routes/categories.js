var express = require("express");
var router = express.Router();

const categoriesCtrl = require("../controllers/categories");

/* GET home page. */
router.get("/", categoriesCtrl.index);

// //New Category Route to display the form
// router.get("/new", categoriesCtrl.categoryForm);

//Creating category Route
// router.post("/", categoriesCtrl.create);

//New Category Route to display the form
router.get("/:id", categoriesCtrl.showCategroyEvents);

//Editting the category data -> form
// //Editting the category data -> form
// router.get("/edit/:id", categoriesCtrl.editCategoryForm);

// //Updating the category data -> database
// router.put("/update/:id", categoriesCtrl.updateCategoryForm);

// //deleting the category
// router.delete("/delete/:id", categoriesCtrl.deleteCategory);

module.exports = router;
