const Category = require("../models/category");
const Suggestion = require("../models/suggestion");
const Event = require("../models/event");
const City = require("../models/city");
const User = require("../models/user");

const cloudinary = require("../utils/cloudinary");

module.exports = {
  index,
  updateCategoryForm,
  deleteCategory,
  createCategory,
  categoryIndex,
  eventsIndex,
  eventForm,
  createEvent,
  updateEventForm,
  deleteEvent,
  categoryAjax,
  eventSuggestAjax,
  eventAjax,
  suggestionsIndex,
  suggestionsDetails,
  suggestionAccept,
  suggestionReject,
  usersIndex,
  userPromote,
  userDemote,
  userBlock,
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

async function categoryIndex(req, res) {
  const category = await Category.find({});
  res.render("admins/categories", {
    title: "Categories",
    category,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function createCategory(req, res) {
  try {
    //Regular Expression that will change the category to lower case
    // and then search on it bu using "i"  a case insensitive search
    const categoryName = await Category.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if category name already available
    if (categoryName) {
      // console.log("Name already exist");
      req.flash("Error", `Category Name Already Exist!`);
      res.redirect("/admins/categories");
    } else {
      // if category name is null -> save it
      await Category.create({
        name: req.body.name,
        icon: req.body.icon,
      });
      req.flash("success", `Category Created successfully!`);
      res.redirect("/admins/categories");
    }
  } catch (error) {
    res.render("error");
  }
}

async function updateCategoryForm(req, res) {
  console.log(req.body);
  const category = await Category.findById(req.params.id);
  category.name = req.body.name;
  category.icon = req.body.icon;
  try {
    await category.save();
    req.flash("success", `Category Updated successfully!`);
    res.redirect("/admins/categories");
  } catch (error) {
    res.render("error");
  }
}

//deleting the category
async function deleteCategory(req, res) {
  try {
    await Category.deleteOne({ _id: req.params.id });
    req.flash("success", `Category Deleted successfully!`);
    res.redirect("/admins/categories");
  } catch (error) {
    res.render("error");
  }
}

async function categoryAjax(req, res) {
  const category = await Category.findById(req.params.id);
  res.json(category);
}
// End of "Categories" Controls

// =========================================================================================
// =========================================================================================

// Start "Events" Controls

async function eventsIndex(req, res) {
  try {
    const categories = await Category.find({});
    const events = await Event.find({});
    const suggestions = await Suggestion.find({});
    const cities = await City.find({});
    res.render("admins/events", {
      title: "Events",
      events: events,
      categories: categories,
      suggestions: suggestions,
      cities: cities,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
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
      console.log("Invalid number");
      req.flash("Error", `Invalid Contact Number!`);
      res.redirect("/admins/events");
    } else if (!googleMapRegex.test(googleMap)) {
      console.log("Invalid Google Maps link");
      req.flash("Error", `Invalid Google Maps Link`);
      res.redirect("/admins/events");
    } else if (!eventNameRegex.test(eventName)) {
      console.log("Invalid Event Name");
      req.flash("Error", `Invalid Event Name`);
      res.redirect("/admins/events");
    } else if (!eventCostRegex.test(eventCost) && eventCost == !null) {
      console.log("Invalid Event Cost");
      req.flash("Error", `Invalid Cost`);
      res.redirect("/admins/events");
    } else {
      if (req.body.imageChangeControl == "old") {
        req.body.profile_img = req.body.oldImageProfile;
        req.body.cloudinary_id = req.body.oldImage;
      } else {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.profile_img = result.secure_url;
        req.body.cloudinary_id = result.public_id;
      }
      delete req.body.suggestName;
      delete req.body.imageChangeControl;
      delete req.body.oldImage;
      delete req.body.oldImageProfile;
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profile_img = result.secure_url;
      req.body.cloudinary_id = result.public_id;

      await Event.create(req.body);
      req.flash("success", `Events Created Successfully!`);
      res.redirect("/admins/events");
    }
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
  try {
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
      console.log("Invalid number");
      req.flash("Error", `Invalid Contact Number!`);
      res.redirect("/admins/events");
    } else if (!googleMapRegex.test(googleMap)) {
      console.log("Invalid Google Maps link");
      req.flash("Error", `Invalid Google Maps Link`);
      res.redirect("/admins/events");
    } else if (!eventNameRegex.test(eventName)) {
      console.log("Invalid Event Name");
      req.flash("Error", `Invalid Event Name`);
      res.redirect("/admins/events");
    } else if (!eventCostRegex.test(eventCost) && eventCost == !null) {
      console.log("Invalid Event Cost");
      req.flash("Error", `Invalid Cost`);
      res.redirect("/admins/events");
    } else {
      const event = await Event.findById(req.params.id);
      if (req.body.imageChangeControl == "old") {
        req.body.profile_img = req.body.oldImageProfile;
        req.body.cloudinary_id = req.body.oldImage;
      } else {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.profile_img = result.secure_url;
        req.body.cloudinary_id = result.public_id;
      }
      event.name = req.body.name;
      (event.description = req.body.description),
        (event.location = req.body.location),
        (event.picture = req.body.picture),
        (event.contact = req.body.contact),
        (event.cost = req.body.cost),
        (event.cityId = req.body.cityId),
        (event.startDate = req.body.startDate),
        (event.endDate = req.body.endDate),
        (event.timeDuration = req.body.timeDuration);
      await event.save();
      req.flash("success", `Events Updated Successfully!`);
      res.redirect("/admins/events");
    }
  } catch (error) {
    res.render("error");
  }
}

//deleting the event
async function deleteEvent(req, res) {
  try {
    await Event.deleteOne({ _id: req.params.id });
    res.redirect("/admins/events");
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

// Start"Suggetions" Controls

async function suggestionsIndex(req, res) {
  try {
    const suggestions = await Suggestion.find({});
    const users = await User.find({});
    console.log(suggestions);
    res.render("admins/suggestions", {
      title: "Suggestions",
      suggestions: suggestions,
      users: users,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}
//Suggestion details
async function suggestionsDetails(req, res) {
  try {
    const suggest = await Suggestion.findById(req.params.id);
    res.render("admins/details", {
      title: "Details",
      suggest: suggest,
    });
  } catch (error) {
    res.render("error");
  }
}

async function suggestionAccept(req, res) {
  try {
      const suggest = await Suggestion.findById(req.params.id);
      suggest.status = true;
      await suggest.save();
      req.flash("success", `Suggest Accept successfully!`);
      res.redirect("/admins/suggestions");
  } catch (error) {
    res.render("error");
  }
}

async function suggestionReject(req, res) {
  try {
    await Suggestion.deleteOne({ _id: req.params.id });
      req.flash("success", `Suggestion Rejected successfully!`);
      res.redirect("/admins/suggestions");
  } catch (error) {
    res.render("error");
  }
}

// End of "Suggetions" Controls

// =========================================================================================
// =========================================================================================

// Start"Users" Controls

async function usersIndex(req, res) {
  try {
    const users = await User.find({});
    res.render("admins/users", {
      title: "Users",
      users: users,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}
async function userPromote(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.role = 1;
    await user.save();
    req.flash("success", `User Promoted successfully!`);
    res.redirect("/admins/users");
  } catch (error) {
    res.render("error");
  }
}

async function userDemote(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.role = 0;
    await user.save();
    req.flash("success", `User Demoted successfully!`);
    res.redirect("/admins/users");
  } catch (error) {
    res.render("error");
  }
}

async function userBlock(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.role = 9;
    await user.save();
    req.flash("success", `User Blocked successfully!`);
    res.redirect("/admins/users");
  } catch (error) {
    res.render("error");
  }
}
// End of "User" Controls
