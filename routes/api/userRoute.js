const router = require("express").Router();
const {
  getAllusers,
  getSingleUser,
  createUser,
  updateOneUser,
  deleteOneUser,
} = require("../../controller/userController");

const {
  addOneFriend,
  deleteOneFriend,
} = require("../../controller/friendController");
//   /api/user
router.route("/").get(getAllusers).post(createUser);


router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateOneUser)
  .delete(deleteOneUser);

router.route("/:userId/friend").post(addOneFriend).delete(deleteOneFriend);

module.exports = router;
