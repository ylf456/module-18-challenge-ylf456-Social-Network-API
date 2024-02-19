const { User, Thought } = require("../models");

module.exports = {
  // find every documents in the collection
  async getAllusers(req, res) {
    try {
      const users = await User.find();
      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json("No user data was found");
        return;
      }
    } catch (error) {
      res.status(500).json(err);
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
      res.status.json(user);
    // example req.body { 
    //   userName (required), 
    //   email (required), 
    //   thoughts(optional), 
    //   friends(optional)
    // }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update one user, find one user by _id and update it (put)
  async updateOneUser(req, res) {
    try {
      // .findOneAndUpdate(condition, update , options)
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {$set: req.body},
        { new: true }
      );
      res.status.json(user);
      //req.body { userName (required), email (required), thoughts , friends}
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete one user, find one user by _id and delete it ()
  // also delete all associated thought
  async deleteOneUser(req, res) {
    try {
      const users = await User.findOneAndDelete({_id : req.params.userId});
      const _ids = users.map((obj) => obj.thoughts.id);
      if (users) {
        res.status(200).json(users); // return the one user it finds
        for (i = 0; i < _ids.length; i++) {
          const deleteThoughts = await Thought.deleteOne(_ids[i]);
        }  // return deleteCount
      } else {
        res.status(404).json("No user data was found");
        return;
      }
    } catch (error) {
      res.status(500).json(err);
    }
  },

};
