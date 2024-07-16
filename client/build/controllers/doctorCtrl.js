const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: "doctor data fetch success",
            data:doctor,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess:false,
            error,
            message:'Error in Fetching Doctor Details'
        })
        
    }
};

//update doc profile

const updateProfileController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate(
            {userId: req.body.userId },
        req.body
        );
        
        res.status(201).send({
            success:true,
            message: "Doctor Profile Updated",
            data: doctor
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Doctor Profile Update issue',
            error
        })
        
    }
};

//get single doctor
const getDoctorByIdController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success:true,
            message:'Single Doctor Info',
            data:doctor
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Single doctor info '
        })
        
    }
};

//doctor appointment controller
const doctorAppointmentsController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.userId });
        console.log(`req body: ${req.body.userId}`);
        console.log(appointmentModel)
        const appointments = await appointmentModel.find({
            userId: req.body.userId,
        });
        console.log(`appointments: ${appointments}`);
        res.status(200).send({
            success: true,
            message: "Doctor Appointment Fetch Successfully",
            data: appointments,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Doctor Appointment'
        })
        
    }
}

//update status controoler
const updateStatusController = async(req,res) => {
    try {
        const {appointmentsId, status, LoggedInUser} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status});
        const user = await userModel.findOne({_id:req.body.LoggedInUser})
        const notification = user.notification
            notification.push({
                type:'Status Updated',
                message:`your appointment has been updated, status: ${status}`,
                onClickPath: '/doctor-appointments',

            })
            await user.save();
            res.status(200).send({
                success:true,
                message:"Appointment Status Updated",
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in update status'
        })
        
    }
}

module.exports = {getDoctorInfoController,updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController};