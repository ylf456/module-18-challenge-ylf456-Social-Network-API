const router = require("express").Router();

const {
  getAllthoughts,
  getOnethought,
  createOneThought,
  updateOneThought,
  deleteOneThought,
} = require("../../controller/thoughtsController");

const {
  addOneReactionToOneThought,
  deleteOneReaction,
} = require("../../controller/reactionController");

router.route("/").get(getAllthoughts).post(createOneThought);

router
  .route("/:thoughtId")
  .get(getOnethought)
  .put(updateOneThought)
  .delete(deleteOneThought);

router
  .route("/:thoughtId/reaction")
  .post(addOneReactionToOneThought)
  .delete(deleteOneReaction);

module.exports = router;
