const Category = require("../models/category");
const Suggestion = require("../models/suggestion");
const Event = require("../models/event");

module.exports = {
  index,
  editCategoryForm,
  updateCategoryForm,
  deleteCategory,
  createCategory,
  showCategroyEvents,
  categoryForm,
  indexEvents,
  eventForm,
  showOne,
  createEvent,
  editEventForm,
  updateEventForm,
  deleteEvent,
  editCategoryAjax,
  deleteCategoryAjax
};

function index(req, res) {
  res.render("admins/dashboard", { title: "DashBoard" });
}

/*

Categories Controller

*/

async function categoryForm(req, res) {
  const category = await Category.find({});
  res.render("admins/categories", { category });
}

async function createCategory(req, res) {
  console.log(req.body);
  const category = new Category({
    name: req.body.name,
  });

  try {
    await category.save();
    res.redirect("/admins/categories");
  } catch (error) {
    res.render("error");
  }
}
async function showCategroyEvents(req, res) {
  const category = await Category.findById(req.params.id);
  const events = await Event.find({}).where("categoryId").equals(req.params.id);
  res.render("admins/events/index", { title: category.name, events: events });
}

async function editCategoryForm(req, res) {
  const category = await Category.findById(req.params.id);
  res.render("admins/categories/edit", {
    category,
    // editCategory: Category.getOne(req.params.edit_id),
    title: "Edit Form",
  });
}

async function updateCategoryForm(req, res) {
  const category = await Category.findById(req.params.id);
  console.log(req.body);
  category.name = req.body.name;
  try {
    await category.save();
    res.redirect("/admins/categories");
  } catch (error) {
    res.render("error");
  }
}

//deleting the category
async function deleteCategory(req, res) {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.redirect("/admins");
  } catch (error) {
    res.render("error");
  }
}

async function editCategoryAjax(req, res) {
  const category = await Category.findById(req.params.id);
  res.json(category);
}
async function deleteCategoryAjax(req, res) {
  const category = await Category.findById(req.params.id);
  res.json(category);
}

/*

Events Controller

*/

async function indexEvents(req, res) {
  const events = await Event.find({});
  res.render("admins/events", { title: "Events", events });
}

async function indexEvents(req, res) {
  try {
    const events = await Event.find({});
    res.render("admins/events", {
      title: "event",
      events: events,
    });
  } catch (error) {
    res.render("error");
  }
}

async function eventForm(req, res) {
  const event = new Event();
  const categories = await Category.find({});
  res.render("admins/events", { event, categories });
}

async function createEvent(req, res) {
  try {
    await Event.create(req.body);
    res.redirect("/admins/events/");
  } catch (error) {
    console.log(error);
    res.render("error", { errorMsg: error.message });
  }
}
async function showOne(req, res) {
  const event = await Event.findById(req.params.id);
  // console.log(event);
  res.render("admins/events/details", { title: "event", event });
}

async function editEventForm(req, res) {
  const event = await Event.findById(req.params.id);
  const categories = await Category.find({});

  res.render("admins/events/edit", {
    event,
    categories,
    // editCategory: Category.getOne(req.params.edit_id),
    title: "Edit Form",
  });
}

async function updateEventForm(req, res) {
  const event = await Event.findById(req.params.id);
  event.name = req.body.name;
  (event.description = req.body.description),
    (event.location = req.body.location),
    (event.picture = req.body.picture),
    (event.contact = req.body.contact),
    (event.cost = req.body.cost),
    (event.startDate = req.body.startDate),
    (event.endDate = req.body.endDate),
    (event.timeDuration = req.body.timeDuration);
  try {
    await event.save();
    res.redirect("/admins");
  } catch (error) {
    res.render("error");
  }
}

//deleting the event
async function deleteEvent(req, res) {
  try {
    await Event.deleteOne({ _id: req.params.id });
    res.redirect("/admins");
  } catch (error) {
    res.render("error");
  }
}
