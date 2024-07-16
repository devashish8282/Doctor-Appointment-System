const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')


//GET ALL DOCTORS
const getAllDoctorsController = async(req,res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            success:true,
            message:'Doctors Data list',
            data:doctors,
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'errors while getting doctors data',
            error
        })
        
    }
};

//GET ALL USERS

const getAllUsersController = async(req,res) => {
    try {
       const users =  await userModel.find({})
       res.status(200).send({
        success:true,
        message:'users data list',
        data:users

        
       })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching users',
            error
        })
        
    }
};

//DOCTOR ACCOUNT STATUS
// const changeAccountController = async(req,res) => {
//     try {
//         const {doctorId, applier, status} = req.body
//         const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
//         const user = await userModel.findOne({ _id: applier}); 
//         console.log(user);
//         const notification = user.notification
//         notification.push({
//             type:'doctor-account-request-updated',
//             message:` Your Docotr Account Request Has ${status}`,
//             onClickPath:'/notification'

//         })

//         user.isDoctor = (status === 'approved');
//         await user.save()
//         res.status(201).send({
//             success:true,
//             message:'Account Status Updated',
//             data:doctor

//         })
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             success:false,
//             message:'Error in Account Status',
//             error
//         })
        
//     }
// }

// module.exports = { getAllDoctorsController, getAllUsersController, changeAccountController};

const changeAccountController = async (req, res) => {
    try {
        const { doctorId, applier, status } = req.body;

        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        const user = await userModel.findById(applier);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.notifications = user.notifications || [];
        user.notifications.push({
            type: 'doctor-account-request-updated',
            message: `Your Doctor Account Request has been ${status}`,
            onClickPath: '/notification'
        });

        user.isDoctor = (status === 'approved');
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Account Status Updated',
            data: doctor
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in Account Status',
            error
        });
    }
};

module.exports = { getAllDoctorsController, getAllUsersController, changeAccountController };
