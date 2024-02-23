const { User, Thought } = require("../models");

module.exports = {
  // find every documents in the collection
  async getAllusers(req, res) {
    try {
      const users = await User.find()
        .populate("thoughts")
        .populate({ path: "friends", model: "user" });
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json("No user data was found");
        return;
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  //find one user document by its _id ()
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      // .select('-__v');  //exclude version data

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user with that ID was found" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create one new user  (post)
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
      // example req.body {
      //   userName (required),
      //   email (required),
      // }
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // update one user, find one user by _id and update it (put)
  async updateOneUser(req, res) {
    try {
      // .findOneAndUpdate(condition, update , options)
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.status(200).json(user);
      //req.body { userName (required), email (required), thoughts , friends}
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // delete one user, find one user by _id and delete it ()
  // also delete all associated thought
  async deleteOneUser(req, res) {
    try {
      const users = await User.findOneAndDelete({ _id: req.params.userId });

      if (users) {
        if (users.thoughts.length > 0) {
          // const _ids = await users.map((obj) => obj.thoughts._id);
          for (i = 0; i < users.thoughts.length; i++) {
            const deleteThoughts = await Thought.deleteOne({
              _id: users.thoughts[i],
            });
          }
         //  mongoDB specific way
         // Thought.deleteMany({ _id: { $in: user.thoughts } });
          res.json(
            "Successfully deleted one user and its related thoughts data"
          );
          // return deleteCount
        } else {
          return res.json(
            "Successfully deleted one user, and there was no thought data related with user to delete"
          );
        }
      } else {
        res.status(404).json("No user data was found");
        return;
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
};
