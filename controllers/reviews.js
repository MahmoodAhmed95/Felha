const Event = require('../models/event');

module.exports = {
  create
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


