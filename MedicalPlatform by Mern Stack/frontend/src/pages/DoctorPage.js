import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [hospitalQuery, setHospitalQuery] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");
  const [specialtyQuery, setSpecialtyQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3055/doctor`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setDoctors(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = doctors.filter(doctor => {
      let byName = doctor.name.toLowerCase().includes(nameQuery.toLowerCase());
      let byHospital = doctor.hospital.toLowerCase().includes(hospitalQuery.toLowerCase());
      let byDepartment = doctor.department.toLowerCase().includes(departmentQuery.toLowerCase());
      let bySpecialty = doctor.specialty.toLowerCase().includes(specialtyQuery.toLowerCase());
      return byName && byHospital && byDepartment && bySpecialty;
    });
    setFilteredDoctors(filtered);
  }, [nameQuery, hospitalQuery, departmentQuery, specialtyQuery, doctors]);


  const DoctorCard = ({ doctor }) => (
    <div className="card card-compact w-96 bg-white shadow-lg m-4 rounded-lg overflow-hidden">
      <figure>
      <img src="http://localhost:3055/uploads/doctor-pic.jpg" alt="Doctor" className="w-full h-auto max-h-48 object-cover" />
      </figure>
      <div className="card-body p-4 bg-blue-200">
        <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
        <p className="text-gray-600 mb-2">
          Hospital: {doctor.hospital}<br />
          Department: {doctor.department}<br />
          Specialty: {doctor.specialty}
        </p>
        <div className="flex justify-end">
          <Link to={`/doctor/view/${doctor.email}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
  

  return (
    <div className="flex flex-col">
        <div className="w-full">
            <h2 className="text-center bg-gray-800 text-red-600 pb-5 pt-5 text-4xl">View All Doctors</h2>
        </div>
        <div className="flex">
            <div className="w-1/3 p-4 border-r border-blue-900 bg-blue-500 min-h-screen">
                <div className="fixed w-1/3 pr-9">
                <h2>Search by Doctor Name</h2>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={nameQuery}
                    onChange={(e) => setNameQuery(e.target.value)}
                    className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
                />
                <h2>Search by Hospital</h2>
                <input
                    type="text"
                    placeholder="Search by hospital"
                    value={hospitalQuery}
                    onChange={(e) => setHospitalQuery(e.target.value)}
                    className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
                />
                <h2>Search by Department</h2>
                <input
                    type="text"
                    placeholder="Search by department"
                    value={departmentQuery}
                    onChange={(e) => setDepartmentQuery(e.target.value)}
                    className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
                />
                <h2>Search by Specialty</h2>
                <input
                    type="text"
                    placeholder="Search by specialty"
                    value={specialtyQuery}
                    onChange={(e) => setSpecialtyQuery(e.target.value)}
                    className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
                />
                </div>
            </div>
            <div className="w-2/3 p-4 flex flex-wrap pl-12 bg-green-300 min-h-screen">
                <div className="flex flex-wrap w-full max-h-screen overflow-auto">
                    {filteredDoctors.map((doctor, index) => (
                        <DoctorCard key={index} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
  
};

export default DoctorPage;
