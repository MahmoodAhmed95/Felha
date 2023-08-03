const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cityId: {
      type: Schema.Types.String,
      ref: "city",
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    cost: {
      type: String,
      default: "Not specified",
    },
    startDate: {
      type: Date,
      default: Date,
    },
    endDate: {
      type: Date,
      default: Date,
    },
    timeDuration: {
      type: String,
      default: "Not specified",
    },
    profile_img: String,
    cloudinary_id: String,
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
