const router = require("express").Router();
const userRoute = require("./userRoute");
const thoughtRoute = require("./thoughtRoute");
//const reactionRoute = require("./reactionRoute");
//const friendRoute = require("./friendRoute");

router.use("/user", userRoute);
router.use("/thought", thoughtRoute);
//router.use("/reaction", reactionRoute);
//router.use("/friend", friendRoute);

module.exports = router;
