import express from "express";
const adminRouter = express.Router()
import { adminLogin, fetchUser, numberOfUser, deleteUser } from '../controllers/adminController.js' 

adminRouter.post('/login', adminLogin)
adminRouter.post('/user', fetchUser)
adminRouter.get('/counts', numberOfUser)
adminRouter.delete('/delete', deleteUser)

export default adminRouter