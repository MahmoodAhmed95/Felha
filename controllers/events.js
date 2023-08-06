const Event = require("../models/event");
const Category = require("../models/category");
const City = require("../models/city");

const cloudinary = require("../utils/cloudinary");
module.exports = {
  index,
  eventForm,
  create,
  showOne,
  editEventForm,
  updateEventForm,
  deleteEvent,
};

async function index(req, res) {
  const events = await Event.find({});
  // const event = new Event();
  const categories = await Category.find({});
  const cities = await City.find({});
  console.log(categories);
  res.render("events/index", { title: "Events", events, cities, categories });
}

async function index(req, res) {
  try {
    const categories = await Category.find({});
    const cities = await City.find({});
    console.log(categories);
    const events = await Event.find({});
    res.render("events/index", {
      title: "event",
      events: events,
      cities: cities,
      categories: categories,
    });
  } catch (error) {
    res.render("error");
  }
}

async function eventForm(req, res) {
  const event = new Event();
  const categories = await Category.find({});
  const cities = await City.find({});
  res.render("events/new", { event, categories, cities });
}

async function create(req, res) {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.profile_img = result.secure_url;
    req.body.cloudinary_id = result.public_id;
    const event = await Event.findOne({ name: req.body.name });
    console.log(event);
    if (event) {
      console.log("Name already exist");
    } else {
      await Event.create(req.body);
      res.redirect("/events/");
    }
  } catch (error) {
    console.log(error);
    res.render("error", { errorMsg: error.message });
  }
}
async function showOne(req, res) {
  const event = await Event.findById(req.params.id);
  // console.log(event);
  res.render("events/details", {
    title: "event",
    event,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function editEventForm(req, res) {
  const event = await Event.findById(req.params.id);
  const categories = await Category.find({});

  res.render("events/edit", {
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
    res.redirect("/");
  } catch (error) {
    res.render("error");
  }
}

//deleting the event
async function deleteEvent(req, res) {
  try {
    await Event.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    res.render("error");
  }
}
