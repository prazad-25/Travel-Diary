const express = require("express");
const router = express.Router();
const validateTokenHandler = require("../middleware/validateTokenHandler.js");
const {getALLTravelDiaries} = require("../controllers/travelController.js");
const {registerUser,loginUser,currentUser} = require("../controllers/userController");
const authroizeRole = require("../middleware/roleMiddleware.js");



router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(validateTokenHandler,currentUser);

router.route("/admin/allTravelDiary").get(validateTokenHandler,authroizeRole("admin"),getALLTravelDiaries)

module.exports = router;