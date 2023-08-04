const Suggestion = require("../models/suggestion");
const Category = require("../models/category");
const City = require("../models/city");

const cloudinary = require("../utils/cloudinary");

module.exports = {
  index,
  create,
};

async function index(req, res) {
  const categories = await Category.find({});
  const cities = await City.find({});
  res.render("suggestions/index", { 
    title: "Suggest",
    cities,
    categories
  });
}

async function create(req, res) {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.profile_img = result.secure_url;
    req.body.cloudinary_id = result.public_id;
    req.body.user = req.user._id;
    await Suggestion.create(req.body);
    res.redirect("/suggestions/");
  } catch (error) {
    console.log(error);
    res.render("error", { errorMsg: error.message });
  }
}
