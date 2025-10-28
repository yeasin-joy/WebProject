import express from "express";
const doctorRouter = express.Router()
import { removeDoctor, createDoctor, registerDoctor, getDoctorByEmail, loginAll, deleteAccount, sendPrescription, changePasswordAll, getAllDoctors, makeAppointment } from '../controllers/doctorController.js'

doctorRouter.get('/', getAllDoctors)
doctorRouter.get('/:email', getDoctorByEmail)
doctorRouter.delete('/', removeDoctor)
doctorRouter.post('/', createDoctor)
doctorRouter.post('/signup', registerDoctor)
doctorRouter.post('/login', loginAll)
doctorRouter.post('/delete', deleteAccount)
doctorRouter.post('/prescription', sendPrescription)
doctorRouter.post('/change/password', changePasswordAll)
doctorRouter.post('/appoinment', makeAppointment)

export default doctorRouter