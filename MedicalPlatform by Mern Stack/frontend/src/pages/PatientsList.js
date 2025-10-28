import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const { hospital } = useParams();
  const email = localStorage.getItem('email');
  const role = localStorage.getItem('role');
  const [doctor, setDoctor] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'doctor') {
      alert('Unauthorised to view this page');
      navigate('/doctor/login')
      window.location.reload();
    }
    fetch(`http://localhost:3055/hospital/patients/${hospital}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.patients) {
          setPatients(data.patients);
        } else {
          console.error('Error fetching patients: Patients data not found');
        }
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, [hospital]);

  const currentDate = new Date().toLocaleDateString();

  const clearAppointments = async () => {
    try {
        const doctorResponse = await fetch(`http://localhost:3055/doctor/${email}`);
        if (!doctorResponse.ok) {
          alert('Unable to fetch data');
          throw new Error('Failed to fetch doctor data');
        }
        const doctorData = await doctorResponse.json();
        setDoctor(doctorData);

        const formData = {
            hospitalName: hospital,
            doctorName: doctorData.name,
            doctorDepartment: doctorData.department
        };

        const appointmentResponse = await fetch(`http://localhost:3055/hospital/delete/appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!appointmentResponse.ok) {
          alert('Unable to delete appointments');
          throw new Error('Failed to clear appointments');
        }

        setPatients([]);
        alert('Successfully Cleared Patients List');
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className="PatientList mx-auto max-w-md p-4 bg-gray-100 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      <p className="mb-4">Current Date: {currentDate}</p>
      <button onClick={clearAppointments} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
        Clear Appointments
      </button>
      <ul>
        {patients.map((patient, index) => (
          <li key={index} className="bg-blue-500 text-white rounded-md p-4 mb-4">
            <div className="mb-2">
              <strong>Name:</strong> {patient.name}
            </div>
            <div>
              <strong>Date:</strong> {currentDate}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
