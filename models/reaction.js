const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
      get: function (value) {
        return moment(value).format("MM-DD-YYYY HH:mm:ss");
      },
    },
  },
  { _id: false },
  { collection: "reaction" },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//const Reaction = model("reaction", reactionSchema);

module.exports = reactionSchema;
