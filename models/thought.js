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
      type: Date, // type: Date  only accepts date or timestamp
      default: Date.now(),
      get: function(value) {
        console.log(value)
        const date = new Date(value);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const MDDYYYY = date.toLocaleDateString("en-US", options);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formatted_date = `${MDDYYYY} ${hours}:${minutes}:${seconds}`;
        console.log(formatted_date);
        return formatted_date;
      },
      /*
      set: (value) => {
        //console.log(value)
        const date = new Date(value);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const MDDYYYY = date.toLocaleDateString("en-US", options);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formatted_date = `${MDDYYYY} ${hours}:${minutes}:${seconds}`;
        console.log(formatted_date);
        return formatted_date;
      },
      */
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
      setters:true
    },
    id: false,
  }
);
/*
thoughtSchema.virtual("formatted_creation_time").get(function () {
  const date = new Date(Date.now());
  const options = { year: "numeric", month: "long", day: "numeric" };
  const MDDYYYY = date.toLocaleDateString("en-US", options);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formatted_date = `${MDDYYYY} ${hours}:${minutes}:${seconds}`;
  return formatted_date; // Custom format using Moment.js
});
*/
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
