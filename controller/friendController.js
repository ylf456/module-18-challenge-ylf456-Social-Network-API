const { User, Thought } = require("../models");

module.exports = {
  // find one user by id, and push new friend id to the array and save
  // post route
  async addOneFriend(req, res) {
    try {
      const userData = await User.findById({_id:req.params.userId});
      if (!userData) {
        res.status(404).json("No user with this _id was found");
        return;
      }
      userData.friends.push(req.body); // req.body = {_id: }
      await userData.save();
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  /*
  // find one user by id, and push new friend id to the array and save
  // post route
  async addOneFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        {_id: req.params.userId},
        {$addToSet: req.body.friendId},
        {runValidators: true, new: true},
        );
      if (!userData) {
        res.status(404).json("No user with this _id was found");
        return;
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  */
 // find one user by id and delete one friend form the array,
 async deleteOneFriend(req, res) {
    try {
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: req.body.friendId},
            {runValidators: true, new: true},
            );
          if (!userData) {
            res.status(404).json("No user with this _id was found");
            return;
          }
          res.status(200).json(userData);
        } catch (error) {
          res.status(500).json(error);
        }
      },
  /*    
  // wrong method to use Mongo   
  // find one user by id and delete one friend form the array,
  async deleteOneFriend(req, res) {
    try {
      const userData = await User.findById(req.params.userId);
      if (!userData) {
        res.status(404).json("No user with this _id was found");
        return;
      }
      // req.body = {_id : ${friendId}}
      const deleteOneFriend = await User.deleteOne(
        userData.friends[userData.findIndex((id) => id === req.body.friendId)]
          ._id
      );
      res.status(200).json("Successfully deleted One friend from friendlist");
      console.log(deleteOneFriend);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  */
};
