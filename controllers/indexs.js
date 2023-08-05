const Event = require("../models/event");
const Category = require("../models/category");
const City = require("../models/city");

// const cloudinary = require("../utils/cloudinary");
module.exports = {
  index,
  getCity,
};

// function to show all in the home page
async function index(req, res) {
  const events = await Event.find({});
  const categories = await Category.find({});
  const cities = await City.find({});

  res.render("index", { events, categories, cities });
}

// new function to get the city by the selected drag drop
async function getCity(req, res) {
  const events = await Event.find({ cityId: req.params.id });
  console.log(events);
  res.json(events);
}
