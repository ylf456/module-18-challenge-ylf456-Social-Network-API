const router = require("express").Router();
const userRoute = require("./userRoute");
const thoughtRoute = require("./thoughtRoute");
const reactionRoute = require("./reactionRoute");
const friendRoute = require("./friendRoute");

route.use("/user", userRoute);
route.use("/thought", thoughtRoute);
route.use("/reaction", reactionRoute);
route.use("/friend", friendRoute);

module.exports = router;
