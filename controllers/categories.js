const category = require("../models/category");
const Category = require("../models/category");
const Event = require("../models/event");
module.exports = {
  index,
  create,
  categoryForm,
  showCategroyEvents,
  editCategoryForm,
  updateCategoryForm,
  deleteCategory,
};

// function index(req, res) {
//   res.render("categories/index", { title: "category" });
// }

async function index(req, res) {
  try {
    const categories = await Category.find({});
    res.render("categories/index", {
      title: "category",
      categories: categories,
    });
  } catch (error) {
    res.render("error");
  }
}

function categoryForm(req, res) {
  const category = new Category();
  res.render("categories/new", { category });
}

async function create(req, res) {
  const category = new Category({
    name: req.body.name,
  });
  try {
    const categoryName = await Category.findOne({ name: req.body.name });
    if (categoryName) {
      console.log("Name already exist");
    } else {
      await category.save();
      res.redirect("categories");
    }
  } catch (error) {
    res.render("error");
  }
}

async function showCategroyEvents(req, res) {
  const categories = await Category.find({});
  const category = await Category.findById(req.params.id);
  const events = await Event.find({}).where("categoryId").equals(req.params.id);
  res.render("events/index", {
    title: category.name,
    events: events,
    categories,
  });
}

async function editCategoryForm(req, res) {
  const category = await Category.findById(req.params.id);
  res.render("categories/edit", {
    category,
    // editCategory: Category.getOne(req.params.edit_id),
    title: "Edit Form",
  });
}

async function updateCategoryForm(req, res) {
  const category = await Category.findById(req.params.id);
  category.name = req.body.name;
  try {
    await category.save();
    res.redirect("/categories");
  } catch (error) {
    res.render("error");
  }
}

//deleting the category
async function deleteCategory(req, res) {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    res.render("error");
  }
}

// async function deleteCategory(req, res) {
//   try {

//     const category = await Category.findById(req.params.id);
//     await Category.remove();
//     res.redirect("/");
//   } catch (error) {
//     console.log(error);
//     res.render("error");
//   }
// }
