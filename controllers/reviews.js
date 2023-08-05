const Event = require("../models/event");

module.exports = {
  create,
};

async function create(req, res) {
  const event = await Event.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  event.reviews.push(req.body);
  try {
    await event.save();
  } catch (error) {
    console.log(error);
  }
  res.redirect(`/`);
}

//deleting the review

// async function deleteReview(req, res) {
//   // Note the cool "dot" syntax to query on the property of a subdoc
//   const event = await Event.findOne({
//     "reviews._id": req.params.id,
//     "reviews.user": req.user._id,
//   });
//   // Rogue user!
//   if (!event) return res.redirect("/");
//   // Remove the review using the remove method available on Mongoose arrays
//   event.reviews.remove(req.params.id);
//   // Save the updated movie doc
//   await event.save();
//   // Redirect back to the movie's show view
//   res.redirect(`/events/${event._id}`);
// }
