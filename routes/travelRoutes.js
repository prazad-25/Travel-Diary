const express = require("express");
const router = express.Router();
const {getTravelDiaries , getTravelDiary , createTravelDiary , updateTravelDiary , deleteTravelDiary} = require("../controllers/travelController");
const validateTokenHandler = require("../middleware/validateTokenHandler");


router.use(validateTokenHandler);
router.route('/').get(getTravelDiaries).post(createTravelDiary);

router.route('/:id').get(getTravelDiary).put(updateTravelDiary).delete(deleteTravelDiary);

module.exports = router;