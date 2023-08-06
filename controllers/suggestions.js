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
    categories,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

// async function create(req, res) {
//   try {
//     // Upload image to cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);
//     req.body.profile_img = result.secure_url;
//     req.body.cloudinary_id = result.public_id;
//     req.body.user = req.user._id;
//     await Suggestion.create(req.body);
//     res.redirect("/suggestions/");
//   } catch (error) {
//     console.log(error);
//     res.render("error", { errorMsg: error.message });
//   }
// }

async function create(req, res) {
  try {
    // Validate contact number
    const contactRegex = /^(3)\d{7}$|(17|80|66|69)\d{6}$/;
    const contact = req.body.contact;

    //Validate Google Embeded link
    const googleMapRegex =
      /<iframe\s*src="https:\/\/www\.google\.com\/maps\/embed\?[^"]+"*\s*[^>]+>*<\/iframe>/;
    const googleMap = req.body.location;

    //Validate Event name
    const eventNameRegex = /^(?=(.*[a-zA-Z]){3})[a-zA-Z0-9\s]+$/;
    const eventName = req.body.name;

    //Validate Cost
    const eventCostRegex = /^\d{1,7}(\.\d{1,2})?$/;
    const eventCost = req.body.cost;

    if (!contactRegex.test(contact) && contact == !null) {
      req.flash("Error", `Invalid Contact Number!`);
      res.redirect("/suggestions/");
    } else if (!googleMapRegex.test(googleMap)) {
      req.flash("Error", `Invalid Google Maps Link`);
      res.redirect("/suggestions/");
    } else if (!eventNameRegex.test(eventName)) {
      req.flash("Error", `Invalid Event Name`);
      res.redirect("/suggestions/");
    } else if (!eventCostRegex.test(eventCost) && eventCost == !null) {
      req.flash("Error", `Invalid Cost`);
      res.redirect("/suggestions/");
    } else {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profile_img = result.secure_url;
      req.body.cloudinary_id = result.public_id;
      req.body.user = req.user._id;

      await Suggestion.create(req.body);
      req.flash("success", `Suggest Added successfully!`);
      res.redirect("/suggestions/");
    }
  } catch (error) {
    req.flash("Error", `Failed Suggest!`);
    res.redirect("/suggestions/");
  }
}
