const { User, Thought } = require("../models");

module.exports = {
  // find all users
  // get route
  async getAllthoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      if (!thoughts) {
        res.status(404).json("No thought data was found");
        return;
      }
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // find one thought by its _id
  //get route
  async getOnethought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json("No thought data was found");
        return;
      }
      res.status(200).json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // create one thought,  also include the userId it belongs to
  // post route
  async createOneThought(req, res) {
    try {
        // example req.body = {
        //         thoughtText: req.body.thoughtText,
        //         userName: req.body.userName,   
        //         userId : req.body.userId
        //                    }
      const thoughtRequest = req.body;
      thoughtRequest = {
        thoughtText: req.body.thoughtText,
        userName: req.body.userName,
      };
      const thought = await Thought.create(thoughtRequest);
      if (!thought) {
        return res
          .status(400)
          .json({ message: "error in creating new thought doc" });
      }
      const newthoughtId = thought._id;

      const user = await User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newthoughtId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'thought created, but found no user with that ID',
        })
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // update one thought. find by _id.
  // put route
  async updateOneThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "No application with this id!" });
      }

      res.status(200).json(thoughtData);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  // delete one thought. find by _id
  // delete route
  async deleteOneThought(req, res) {
    try {
      const deleteOneThought = await Thought.findByIdAndDelete({
        _id: req.params._id,
      });
      if (!deleteOneThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      // update associated thoughts array for the user
      const updateUser = await User.findOneAndUpdate(
        { thoughts: req.params._id },
        { $pull: { thoughts: req.params._id } },
        { runValidators: true, new: true }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.status(200).json({ message: "Thought Successfully deleted" });
    } catch (error) {
      res.status(200).json(thoughtData);
    }
  },
};
