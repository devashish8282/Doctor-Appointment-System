const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl')
const router = express.Router()

//post single doc info
router.post('/getDoctorInfo',authMiddleware, getDoctorInfoController)

//post update profile
router.post('/updateProfile',updateProfileController)

//POST GET SIMPLE DOC INFO
router.post('/getDoctorById', authMiddleware, getDoctorByIdController )

//GET APPOINTMENTS
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController)

//POST UPADATE STATUS
router.post('/update-status', authMiddleware, updateStatusController)


module.exports = router