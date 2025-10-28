import Hospital from '../models/hospitalModel.js'
import Patient from '../models/patientModel.js';
import Doctor from '../models/doctorModel.js';
import bcrypt from 'bcrypt';

export const createHospital = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.phoneNo ||
            !req.body.city ||
            !req.body.area ||
            !req.body.roadNo ||
            !req.body.houseNo ||
            !req.body.departments ||
            !req.body.description 
        ){
            return res.status(400).send({
                message: 'Send all the required fields: name, email, phone number, city, area, road number, house number, departments, description'
            })
        }
        const newHospital = {
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            city: req.body.city,
            area: req.body.area,
            roadNo: req.body.roadNo,
            houseNo: req.body.houseNo,
            laneNo: req.body.laneNo,
            departments: req.body.departments,
            description: req.body.description,
            pendingRequests: req.body.pendingRequests,
            announcements: req.body.announcements
        }

        const hospital = await Hospital.create(newHospital)

        return res.status(200).send(hospital)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const getHospitalAnnouncements = async (req, res) => {
    try {
        if (!req.params.email){
            return res.status(400).send({
                message: 'No hospital to search for announcement'
            })
        }
        const hospital = await Hospital.findOne({ email: req.params.email })
        return res.status(200).send(hospital);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const createAnnouncement = async (req, res) => {
    const currentDate = new Date();

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()

    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    const dateTime = `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`
    try {
        if (
            !req.body.email ||
            !req.body.announcements
        ){
            return res.status(400).send({
                message: 'No announcement or email found'
            })
        }
        const announcement = [dateTime, req.body.announcements]
        const updatedHospital = await Hospital.findOneAndUpdate(
            { email: req.body.email }, 
            { $push: { announcements: announcement } }, 
            { new: true } 
        );
        return res.status(200).send(updatedHospital)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const deleteAnnouncement = async (req, res) => {
    try {
        if (
            !req.body.email ||
            !req.body.announcementDate
        ){
            return res.status(400).send({
                message: 'No announcement date or email found'
            })
        }
        const updatedHospital = await Hospital.findOneAndUpdate(
            { email: req.body.email },
            { $pull: { announcements: { $elemMatch: { $eq: req.body.announcementDate } } } },
            { new: true }
        );
        return res.status(200).send(updatedHospital)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const getAllHospitals = async (req, res) => {
    try {
        const hospital = await Hospital.find()
        return res.status(200).send(hospital);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
}

export const signUpHospital = async (req, res) => {
    try {
        const { name, email, phoneNo, address, area, city, password, description, departments } = req.body;

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
        existingUser = await Hospital.findOne({ name: name })
        if (existingUser) {
            return res.status(400).json({ error: 'User with the name provided already exists!' })
        }
        if (phoneNo.length !== 11) {
            return res.status(400).json({ error: 'Invalid Phone Number! Phone Number must be 11 characters long!' })
        }
        if (!phoneNo.startsWith("01")) {
            return res.status(400).json({ error: 'Invalid Phone Number for Bangladesh!' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const departmentNames = Object.keys(departments);
        const emptyDepartments = {};
        departmentNames.forEach(departmentName => {
            emptyDepartments[departmentName] = [];
        });
        const newHospital = new Hospital({ 
            name, 
            email, 
            phoneNo, 
            city, 
            area, 
            address, 
            departments: emptyDepartments, 
            description, 
            password: hashedPassword, 
            announcements: [],
            fee: '500' 
        });

        await newHospital.save();

        res.status(201).json({ message: 'Hospital created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const createDepartment = async (req, res) => {
    try {
        const { hospitalEmail, departmentName } = req.body;
        const hospital = await Hospital.findOne({ email: hospitalEmail });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        
        if (hospital.departments.has(departmentName)) {
            return res.status(400).json({ error: 'Department already exists' });
        }
        
        hospital.departments.set(departmentName, []);

        await hospital.save();

        res.status(201).json(hospital);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const removeDepartment = async (req, res) => {
    try {
        const { hospitalEmail, departmentName } = req.body;
        const hospital = await Hospital.findOne({ email: hospitalEmail });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        
        if (!hospital.departments.has(departmentName)) {
            return res.status(400).json({ error: 'Department does not exist' });
        }
        
        hospital.departments.delete(departmentName);

        await hospital.save();

        res.status(200).json(hospital);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateFee = async (req, res) => {
    try {
        const { mail, newFee } = req.body;
        const hospital = await Hospital.findOne({ email: mail });

        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        const feeAsNumber = Number(newFee);

        if (isNaN(feeAsNumber)) {
            return res.status(400).json({ error: 'New fee must be a valid number' });
        }

        hospital.fee = feeAsNumber;

        await hospital.save();

        res.status(200).json(hospital);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getPatientList = async (req, res) => {
    try {
        const hospitalName = req.params.hospital; 
        const hospital = await Hospital.findOne({ name: hospitalName });

        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        const patients = extractPatientsFromHospital(hospital); 

        res.status(200).json({ patients });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const extractPatientsFromHospital = (hospital) => {
    const patients = [];
    for (const department of hospital.departments.values()) {
        for (const doctor of department) {
            for (const appointment of doctor.appointments) {
                patients.push({ name: appointment[0] });
            }
        }
    }
    return patients;
};

export const makeAppointment = async (req, res) => {
    const { patientName, patientEmail, selectedDepartment, selectedDoctor, hospitalEmail } = req.body;
  
    try {
      const hospital = await Hospital.findOne({ email: hospitalEmail });
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
  
export const clearAppointments = async (req, res) => {
    try {
        const { hospitalName, doctorName, doctorDepartment } = req.body;
        const hospital = await Hospital.findOne({ name: hospitalName });
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
      
        const department = hospital.departments.get(doctorDepartment);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
      
        const doctor = department.find(doc => doc.name === doctorName);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
    
        doctor.appointments = []
    
        await hospital.save();
  
        res.status(200).json({ message: 'Appointments cleared successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  