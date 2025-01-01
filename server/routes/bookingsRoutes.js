const router = require("express").Router();
const {
  roomBooking,
  getBookingsByUserId,
  cancelBooking,
} = require("../controllers/bookingsControllers");

router.post("/roomBooking", roomBooking);

router.post("/getbookingsbyuserid", getBookingsByUserId);

router.post("/cancelbooking", cancelBooking);

module.exports = router;
