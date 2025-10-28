import express from "express"
const patientRouter = express.Router()
import { createPatient, getPatientByEmail, submitPdf } from '../controllers/patientController.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'


const createUploadsFolder = (req, res, next) => {
    const uploadsFolderPath = path.join(process.cwd(), 'uploads')
    if (!fs.existsSync(uploadsFolderPath)) {
        fs.mkdirSync(uploadsFolderPath)
    }

    next();
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const originalFilename = file.originalname;
        const timestamp = Date.now();
        const filename = `${timestamp}_${originalFilename}`;
        cb(null, filename); 
    }
});


const upload = multer({ storage: storage });
patientRouter.post('/sendPdf/:email/:doctorEmail', createUploadsFolder, upload.single('pdfFile'), submitPdf);
patientRouter.post('/', createPatient)
patientRouter.get('/:email', getPatientByEmail)

export default patientRouter