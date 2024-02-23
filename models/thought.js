const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const FormatDate = require('../utils/Date-Format')
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
      type: String, // type: Date only accepts date or timestamp
      default: FormatDate()
    },
    TimeStamp: {
      type: Date,
      default: Date.now()
    },
    userName: {
      type: String,
      required: true,
    },
    
    reactions: [reactionSchema],
  },
  { collection: "thought" },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      setters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("ReactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
