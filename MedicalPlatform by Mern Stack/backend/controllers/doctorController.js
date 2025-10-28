import Hospital from '../models/hospitalModel.js'
import Doctor from '../models/doctorModel.js';
import Patient from '../models/patientModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'super-secret-key'

export const removeDoctor = async (req, res) => {
    try {
        const { hospitalName, departmentName, doctorName } = req.body
        const hospital = await Hospital.findOne({ name: hospitalName })
        if (!hospital) {
            throw new Error('Hospital not found')
        }
        const department = hospital.departments.get(departmentName)
        if (!department) {
            throw new Error('Department not found')
        }
        const doctor = department.find(doctor => doctor.name === doctorName);
        if (!doctor) {
            throw new Error('Doctor not found in the department');
        }
        const doctorEmail = doctor.email;
        const index = department.findIndex(doctor => doctor.name === doctorName)
        if (index === -1) {
            throw new Error('Doctor not found in the department')
        }
        department.splice(index, 1)
        await hospital.save()

        const doctorToDelete = await Doctor.findOne({ email: doctorEmail });
        if (!doctorToDelete) {
            throw new Error('Doctor not found in the Doctor collection');
        }

        await Doctor.deleteOne({ email: doctorEmail });
        
        console.log(`Doctor ${doctorName} removed from ${departmentName} department in ${hospitalName} hospital`)
        return res.status(200).send(hospital)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: error.message })
    }
}


export const createDoctor = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.phoneNo ||
            !req.body.specialty ||
            !req.body.hospital
        ){
            return res.status(400).send({
                message: 'Send all the required fields: name, email, phone number, specialty, hospital'
            })
        }

        const newDoctor = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            specialty: req.body.specialty,
            hospital: req.body.hospital,
            pdfs: req.body.pdfs || []
        }

        const doctor = await Doctor.create(newDoctor)

        return res.status(200).send(doctor)
    } catch (error) {
        console.error(error.message)
        res.status(500).send({ message: error.message })
    }
};

// Arundhati's Doctor SignUp
export const registerDoctor = async (req, res) => {
    try {
        const { name, email, phoneNo, specialty, hospital, department, password, hospitalEmail } = req.body;

        let existingUser = await Patient.findOne({ email: email })
        if (!existingUser) {
            existingUser = await Doctor.findOne({ email: email })
        }
        if (!existingUser) {
            existingUser = await Hospital.findOne({ email: email })
        }
        if (existingUser) {
            return res.status(400).json({ error: 'User with the email provided already exists!' })
        }

        if (phoneNo.length !== 11) {
            return res.status(400).json({ error: 'Invalid Phone Number! Phone Number must be 11 characters long!' })
        }
        if (!phoneNo.startsWith("01")) {
            return res.status(400).json({ error: 'Invalid Phone Number for Bangladesh!' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Doctor({ 
            name,
            email,
            phoneNo,
            specialty,
            hospital,
            department,
            password: hashedPassword,
            pdfs: [] 
        });
        await newUser.save();
        
        const patientData = {
            name,
            degree: specialty,
            email,
            appointments: []
        };

        try {
            const updatedHospital = await Hospital.findOneAndUpdate(
                { email: hospitalEmail, [`departments.${department}`]: { $exists: true } },
                { $push: { [`departments.${department}`]: patientData } },
                { new: true }
            );            

            if (updatedHospital) {
                res.status(201).json({ message: 'User created successfully' });
            } else {
                res.status(404).json({ error: 'Hospital or department not found' });
            }
        } catch (error) {
            console.error('Error updating hospital:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } catch (error) {
        console.error('Error registering doctor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Doctor.findOne({ email: email })

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }

        let isPasswordValid;
        try {
            isPasswordValid = await bcrypt.compare(password, user.password)
        } catch (error) {
            return res.status(500).json({ error: 'Error comparing passwords' })
        }

        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        let token;
        try {
            token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
        } catch (error) {
            return res.status(500).json({ error: 'Error signing token' })
        }

        res.status(200).json({ message: 'Login successful', token: token, user: user });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
}

export const getDoctorByEmail = async (req, res) => {
    try {
        if (!req.params.email){
            return res.status(400).send({
                message: 'No hospital to search for announcement'
            })
        }
        const doctor = await Doctor.findOne({ email: req.params.email })
        return res.status(200).send(doctor);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const loginAll = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await Patient.findOne({ email: email });
        let role = 'patient'

        if (!user) {
            user = await Doctor.findOne({ email: email });
            role = 'doctor'
        }

        if (!user) {
            user = await Hospital.findOne({ email: email });
            role = 'hospital'
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }

        let isPasswordValid;
        try {
            isPasswordValid = await bcrypt.compare(password, user.password)
        } catch (error) {
            return res.status(500).json({ error: 'Error comparing passwords' })
        }

        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        let token;
        try {
            token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
        } catch (error) {
            return res.status(500).json({ error: 'Error signing token' })
        }

        res.status(200).json({ message: 'Login successful', token: token, user: user, role: role });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await Patient.findOne({ email: email });
        if (!user) {
            user = await Doctor.findOne({ email: email });
        }
        if (!user) {
            user = await Hospital.findOne({ email: email });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let isPasswordValid;
        try {
            isPasswordValid = await bcrypt.compare(password, user.password);
        } catch (error) {
            return res.status(500).json({ error: 'Error comparing passwords' });
        }

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        try {
            if (user instanceof Patient) {
                await user.deleteOne();
            } else if (user instanceof Doctor) {
                await user.deleteOne();
            } else if (user instanceof Hospital) {
                await user.deleteOne();
            } else {
                return res.status(500).json({ error: 'Invalid user type' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting account' });
        }
        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting account' });
    }
};

export const sendPrescription = async (req, res) => {
    try {
        const { name, patientEmail, prescription } = req.body;
        const patient = await Patient.findOne({ email: patientEmail });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        patient.prescriptions.push({
            date: new Date(),
            doctorName: name,
            prescription: prescription
        });
        await patient.save();
        return res.status(200).json({ message: "Prescription sent successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const changePasswordAll = async (req, res) => {
    try {
        const { email, currentPassword, newPassword, role } = req.body
        let user = ''

        if (role === 'patient') {
            user = await Patient.findOne({ email: email });
        }

        else if (role === 'doctor') {
            user = await Doctor.findOne({ email: email });
        }

        else if (role === 'hospital') {
            user = await Hospital.findOne({ email: email });
        }

        else {
            return res.status(401).json({ error: 'User not Logged-In!'})
        }

        let isPasswordValid;
        try {
            isPasswordValid = await bcrypt.compare(currentPassword, user.password)
        } catch (error) {
            return res.status(500).json({ error: 'Error comparing password!' })
        }

        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password!' })
        }

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword
            await user.save()
        } catch (error) {
            return res.status(500).json({ error: 'Error saving new password to DB!' })
        }

        res.status(200).json({ message: 'Password successfully updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating password!' })
    }
}

export const getAllDoctors = async (req, res) => {
    try {
        const doctor = await Doctor.find()
        return res.status(200).send(doctor);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const makeAppointment = async (req, res) => {
    const { patientName, patientEmail, selectedDepartment, selectedDoctor, hospitalName } = req.body;
  
    try {
      const hospital = await Hospital.findOne({ name: hospitalName });
      if (!hospital) {
        return res.status(404).json({ message: 'Hospital not found' });
      }
  
      const department = hospital.departments.get(selectedDepartment);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      const doctor = department.find(doc => doc.name === selectedDoctor);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      const estimatedTime = (doctor.appointments.length * 5);
      let hr = 5; 
        let min = 0; 

        if (estimatedTime >= 60) {
            hr += Math.floor(estimatedTime / 60); 
            min = estimatedTime % 60; 
        }
        else {
            min = estimatedTime
        }

        const time = `${hr}:${min < 10 ? '0' + min : min} pm`; 


      doctor.appointments.push([patientName, patientEmail]);

      await hospital.save();

      const patient = await Patient.findOne({ email: patientEmail });
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      patient.appointments.push([hospital.name, selectedDoctor, time]);
      await patient.save();
  
      res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };