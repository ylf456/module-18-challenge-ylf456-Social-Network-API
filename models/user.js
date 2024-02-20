const { Schema, model } = require("mongoose");

// Schema to create a course model
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  }, 
  { collection: 'user'},
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCound").get(function () {
  return this._id.length;
});
// Create a virtual called `friendCount`
// that retrieves the length of the user's `friends` array field
// on query.

const User = model("user", userSchema);

module.exports = User;
