import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Department = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('')
  const [hospital, setHospital] = useState('')
  const location = useLocation();
  

  useEffect(() => {
    const { hospitalName, departmentName, departments } = location.state || {};
    const department = departments?.[departmentName];
    setDoctors(departments || []);
    setName(departmentName || '')
    setHospital(hospitalName || '')
    console.log(department)
  }, []);
  
    const handleRemoveDoctor = async (doctorName) => {
      const data = {
        hospitalName: hospital,
        departmentName: name,
        doctorName: doctorName
      };
      try {
        const response = await fetch(`http://localhost:3055/doctor`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const newData = await response.json();
        const updatedDepartments = newData.departments.get(name);
        setDoctors(updatedDepartments);
      } catch (error) {
        console.error('Error removing doctor:', error.message);
      }
    };
  
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Department of {name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors?.map((doctor) => (
            <div key={doctor.name} className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">{doctor.name}</h2>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleRemoveDoctor(doctor.name)}
                >
                  Remove
                </button>
              </div>
              <p className="text-sm">{doctor.degree}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  

export default Department;
