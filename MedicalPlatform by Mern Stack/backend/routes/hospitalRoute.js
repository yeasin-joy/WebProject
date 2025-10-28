import express from "express";
const hospitalRouter = express.Router()
import { createHospital, getHospitalAnnouncements, createAnnouncement, deleteAnnouncement, getAllHospitals, signUpHospital, makeAppointment, createDepartment, removeDepartment, updateFee, getPatientList, clearAppointments } from '../controllers/hospitalController.js'


hospitalRouter.post('/', createHospital)
hospitalRouter.get('/:email', getHospitalAnnouncements)
hospitalRouter.put('/', createAnnouncement)
hospitalRouter.delete('/', deleteAnnouncement)
hospitalRouter.get('/', getAllHospitals)
hospitalRouter.post('/signup', signUpHospital)
hospitalRouter.post('/appoinment', makeAppointment)
hospitalRouter.post('/department', createDepartment)
hospitalRouter.delete('/department', removeDepartment)
hospitalRouter.post('/fee', updateFee)
hospitalRouter.get('/patients/:hospital', getPatientList)
hospitalRouter.post('/delete/appointments', clearAppointments)

export default hospitalRouter