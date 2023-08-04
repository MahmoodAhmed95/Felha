const Category = require("../models/category");
const Suggestion = require("../models/suggestion");
const Event = require("../models/event");
const City = require("../models/city");

const cloudinary = require("../utils/cloudinary");

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
  deleteCategoryAjax,
  eventSuggestAjax,
  eventAjax
};

// =========================================================================================
// =========================================================================================

// Start "Dashboard" Controls

  function index(req, res) {
    res.render("admins/dashboard", { title: "Dashboard" });
  }

// End Of "Dashboard" Controls

// =========================================================================================
// =========================================================================================

// Start "Categories" Controls

  async function categoryForm(req, res) {
    const category = await Category.find({});
    res.render("admins/categories", { title:"Categories",category });
  }

  async function createCategory(req, res) {
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
      title: "Edit Form",
    });
  }

  async function updateCategoryForm(req, res) {
    const category = await Category.findById(req.params.id);
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
      res.redirect("/admins/categories");
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

// End of "Categories" Controls

// =========================================================================================
// =========================================================================================

// Start "Events" Controls

  async function indexEvents(req, res) {
    try {
      const categories = await Category.find({});
      const events = await Event.find({});
      const suggestions = await Suggestion.find({});
      const cities = await City.find({});
      res.render("admins/events", {
        title: "Events",
        events: events,
        categories : categories,
        suggestions : suggestions,
        cities : cities,
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
    console.log(req.body);
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profile_img = result.secure_url;
      req.body.cloudinary_id = result.public_id;
      await Event.create(req.body);
      res.redirect("/admins/events");
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

  async function eventAjax(req, res) {
    const event = await Event.findById(req.params.id);
    res.json(event);
  }

  async function eventSuggestAjax(req, res) {
    const suggestion = await Suggestion.findById(req.params.id);
    res.json(suggestion);
  }
// End of "Events" Controls

// =========================================================================================
// =========================================================================================

