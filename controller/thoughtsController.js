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
      //console.log(req.body)
      const thoughtRequest = {
        thoughtText: req.body.thoughtText,
        userName: req.body.userName,
      };
      console.log(thoughtRequest)
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
          message: "thought created, but found no user with that ID",
        });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  // update one thought. find by _id.
  // put route
  async updateOneThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "No thought data with this id!" });
      }

      res.status(200).json(thoughtData);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  // delete one thought. find by _id
  // delete route
  async deleteOneThought(req, res) {
    try {
      const deleteOneThought = await Thought.findByIdAndDelete({
        _id: req.params.thoughtId,
      });
      if (!deleteOneThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      // update associated thoughts array for the user
      const updateUser = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { runValidators: true, new: true }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "Succesfully deleted the thought data, but find no user data associated with this thought" });
      }

      res.status(200).json(updateUser);
    } catch (error) {
      res.status(200).json(error);
    }
  },
  async createManyThought(req, res) {
    try {
      // example req.body = {
      //         thoughtText: req.body.thoughtText,
      //         userName: req.body.userName,
      //         userId : req.body.userId
      //                    }
      console.log(req.body)
      const thoughtRequest =req.body.map((obj)=> obj = {
        thoughtText: obj.thoughtText,
        userName: obj.userName,
      })
      console.log(thoughtRequest)
      const thought = await Thought.create(thoughtRequest);
      if (!thought) {
        return res
          .status(400)
          .json({ message: "error in creating new thought doc" });
      }
     // console.log(thought)
      const newthoughtId = thought.map((obj)=> obj._id); // array of _id
      //example 
//       [
//   new ObjectId('65d6a3a2bfaeee57462e1c91'),
//   new ObjectId('65d6a3a2bfaeee57462e1c92')
//       ]
     // console.log('newthoughtId')
     // console.log(newthoughtId);
      const user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: newthoughtId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "thought created, but found no user with that ID",
        });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
};
// seeding user and thoughts 
