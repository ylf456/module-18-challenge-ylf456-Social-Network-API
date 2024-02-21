const { User, Thought } = require("../models");
const reactionSchema = require("../models/reaction");
module.exports = {
  // find one thought doc by _id and and insert one into its thoughs array
  // post route
  async addOneReactionToOneThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "No application with this id!" });
      }
      res.status(200).json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  // find one Reaction by its _id and delete it, and update its associated thought doc.
  // delete route
  async deleteOneReaction(req, res) {
    try {
      const deleteOneReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { runValidators: true, new: true }
      );
      
      if (!deleteOneReaction) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.status(200).json(deleteOneReaction);
    } catch (error) {
      res.status(500).json(error);
      console.log(error)
    }
  },
};
