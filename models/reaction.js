const { Schema, model } = require("mongoose");

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//const Reaction = model("course", reactionSchema);

module.exports = reactionSchema;
