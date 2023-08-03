var express = require("express");
var router = express.Router();

const categoriesCtrl = require("../controllers/categories");

/* GET home page. */
router.get("/", categoriesCtrl.index);

//New Category Route to display the form
router.get("/new", categoriesCtrl.categoryForm);

//New Category Route to display the form
router.get("/:id", categoriesCtrl.showCategroyEvents);

//Creating category Route
router.post("/", categoriesCtrl.create);

//Editting the category data -> form
router.get("/edit/:id", categoriesCtrl.editCategoryForm);

//Updating the category data -> database
router.put("/update/:id", categoriesCtrl.updateCategoryForm);

//deleting the category
router.delete("/delete/:id", categoriesCtrl.deleteCategory);

module.exports = router;
