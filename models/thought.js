const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createAt: {
      type: Date,
      default: Date.now(),
      get: function (value) {
        return moment(value).format("MM-DD-YYYY HH:mm:ss");
      },
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
