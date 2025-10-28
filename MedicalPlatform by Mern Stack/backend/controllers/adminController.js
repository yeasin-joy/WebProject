import Hospital from '../models/hospitalModel.js'
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js'


export const adminLogin = async (req, res) => {
    try {
        const admin = 'Ahnaf'
        const pass = '1234'

        const { username, password } = req.body

        if (username !== admin) {
            return res.status(401).json({ error: 'Incorrect username for admin!' })
        }
        if (password !== pass) {
            return res.status(401).json({ error: 'Incorrect password for admin!' })
        }

        res.status(200).json({ message: 'Login successful' })
        
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
}

export const fetchUser = async (req, res) => {
    try {
        const { email, selectedOption } = req.body
        let user

        if (selectedOption === 'patient') {
            user = await Patient.findOne({ email: email })
            if (!user) {
                return res.status(401).json({ error: 'Patient with email not found!' })
            }
        }
        else if (selectedOption === 'doctor') {
            user = await Doctor.findOne({ email: email })
            if (!user) {
                return res.status(401).json({ error: 'Doctor with email not found!' })
            }
        }
        else {
            user = await Hospital.findOne({ email: email })
            if (!user) {
                return res.status(401).json({ error: 'Hospital with email not found!' })
            }
        }

        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json({ error: 'Error Fetching User' })
    }
}

export const numberOfUser = async (req, res) => {
    try {
        const patientCount = await Patient.countDocuments();
        const doctorCount = await Doctor.countDocuments();
        const hospitalCount = await Hospital.countDocuments();

        res.status(200).json({
            patients: patientCount,
            doctors: doctorCount,
            hospitals: hospitalCount
        });
    } catch (error) {
        res.status(500).json({ error: 'Error Fetching User Counts' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { email, selectedOption } = req.body;
        let user;

        if (selectedOption === 'patient') {
            user = await Patient.findOneAndDelete({ email: email });
            if (!user) {
                return res.status(401).json({ error: 'Patient with email not found!' });
            }
        }
        else if (selectedOption === 'doctor') {
            user = await Doctor.findOneAndDelete({ email: email });
            if (!user) {
                return res.status(401).json({ error: 'Doctor with email not found!' });
            }
        }
        else {
            user = await Hospital.findOneAndDelete({ email: email });
            if (!user) {
                return res.status(401).json({ error: 'Hospital with email not found!' });
            }
        }

        res.status(200).json({ message: 'User has been deleted!' });
        
    } catch (error) {
        res.status(500).json({ error: 'Error Deleting User' });
    }
};
