const Suggestion = require("../models/suggestion");
const Category = require("../models/category");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  index,
  suggestionForm,
  create,
};

function index(req, res) {
  res.render("suggestions/index", { title: "Suggest" });
}

async function suggestionForm(req, res) {
  const suggestion = new Suggestion();
  const categories = await Category.find({});
  res.render("suggestions/", { suggestion, categories });
}

async function create(req, res) {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.profile_img = result.secure_url;
    req.body.cloudinary_id = result.public_id;
    await Suggestion.create(req.body);
    res.redirect("/suggestions/");
  } catch (error) {
    console.log(error);
    res.render("error", { errorMsg: error.message });
  }
}
