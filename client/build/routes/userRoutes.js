const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController,deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppointmentController } = require('../controllers/userCtrl');
const  authMiddleware = require("../middlewares/authMiddleware");
const { doctorAppointmentsController } = require('../controllers/doctorCtrl');

//router object
const router = express.Router();

//routes
//login || post
router.post("/login", loginController);
//register ||post
router.post("/register", registerController);

//Auth || post
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || post
router.post("/apply-doctor",authMiddleware, applyDoctorController);

//Notification Doctor || post
router.post("/get-all-notification",authMiddleware, getAllNotificationController);

//Notification Doctor || post
router.post("/delete-all-notification",authMiddleware, deleteAllNotificationController);

//GET ALLL DOC
router.get('/getAllDoctors',authMiddleware, getAllDoctorsController)


//Book Appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController)

//BOOKING AVAILABILITY
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)

//APPOINTMENT LIST
router.get('/user-appointments', userAppointmentController)

module.exports = router;

