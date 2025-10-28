import Patient from '../models/patientModel.js'
import Hospital from '../models/hospitalModel.js'
import Doctor from '../models/doctorModel.js';
import bcrypt from 'bcrypt';

export const createPatient = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.phoneNo ||
            !req.body.password
        ){
            return res.status(400).send({
                message: 'Send all the required fields: name, email, phone number, password'
            });
        }

        let existingUser = await Patient.findOne({ email: req.body.email })
        if (!existingUser) {
            existingUser = await Doctor.findOne({ email: req.body.email })
        }
        if (!existingUser) {
            existingUser = await Hospital.findOne({ email: req.body.email })
        }
        if (existingUser) {
            return res.status(400).json({ error: 'User with the email provided already exists!' })
        }

        if (req.body.phoneNo.length !== 11) {
            return res.status(400).json({ error: 'Invalid Phone Number! Phone Number must be 11 characters long!' })
        }
        if (!req.body.phoneNo.startsWith("01")) {
            return res.status(400).json({ error: 'Invalid Phone Number for Bangladesh!' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newPatient = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            password: hashedPassword,
            prescriptions: req.body.prescriptions || [],
            pdfs: req.body.pdfs || [],
            appointments: req.body.appointments || []
        };

        const patient = await Patient.create(newPatient);

        return res.status(200).send(patient);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};


export const getPatientByEmail = async (req, res) => {
    try {
        if (!req.params.email){
            return res.status(400).send({
                message: 'No patient found!'
            })
        }
        const patient = await Patient.findOne({ email: req.params.email })
        return res.status(200).send(patient);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const submitPdf = async (req, res) => {
    try {
        const { email, doctorEmail } = req.params;
        const { filename } = req.file;

        const pdfLink = `http://localhost:3055/uploads/${filename}`;

        const patient = await Patient.findOneAndUpdate(
            { email: email },
            { $push: { "pdfs": [new Date(), pdfLink] } },
            { new: true }
        );
        res.json(patient);
    } catch (error) {
        console.error('Error submitting PDF:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};