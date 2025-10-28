import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [nameQuery, setNameQuery] = useState("");
  const [areaQuery, setAreaQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [departmentQuery, setDepartmentQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3055/hospital`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setHospitals(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = hospitals.filter(hospital => {
      let byName = hospital.name.toLowerCase().includes(nameQuery.toLowerCase());
      let byArea = hospital.area.toLowerCase().includes(areaQuery.toLowerCase());
      let byCity = hospital.city.toLowerCase().includes(cityQuery.toLowerCase());
      let byDepartment = Object.keys(hospital.departments).some(department =>
        department.toLowerCase().includes(departmentQuery.toLowerCase())
      );
      return byName && byArea && byDepartment && byCity;
    });
    setFilteredHospitals(filtered);
  }, [nameQuery, areaQuery, departmentQuery, hospitals, cityQuery]);


  const HospitalCard = ({ hospital }) => (
    <div className="card card-compact w-96 bg-white shadow-lg m-4 rounded-lg overflow-hidden">
      <figure>
        <img src="http://localhost:3055/uploads/hospital_pic.jpeg" alt="Hospital" className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body p-4 bg-green-200">
        <h2 className="text-xl font-bold mb-2">{hospital.name}</h2>
        <p className="text-gray-600 mb-2">
          {hospital.city}, {hospital.area}
        </p>
        <div className="flex justify-end">
          <Link to={`/hospital/view/${hospital.email}`}>
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
        <h2 className="text-center bg-gray-800 text-red-600 pb-5 pt-5 text-4xl">View All Hospitals</h2>
      </div>
      <div className="flex">
        <div className="w-1/3 p-4 border-r border-blue-900 bg-yellow-200 min-h-screen">
          <div className="fixed w-1/3 pr-9">
            <h2>Search using Hospital Name</h2>
            <input
              type="text"
              placeholder="Search by name"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
            />
            <h2>Search Hospital within an Area</h2>
            <input
              type="text"
              placeholder="Search by area"
              value={areaQuery}
              onChange={(e) => setAreaQuery(e.target.value)}
              className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
            />
            <h2>Search Hospital within a City</h2>
            <input
              type="text"
              placeholder="Search by city"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
            />
            <h2>Search Hospital containing a Department</h2>
            <input
              type="text"
              placeholder="Search by department"
              value={departmentQuery}
              onChange={(e) => setDepartmentQuery(e.target.value)}
              className="border border-gray-400 rounded px-4 py-2 mb-4 block w-full"
            />
          </div>
        </div>
        <div className="w-2/3 p-4 flex flex-wrap pl-12 bg-blue-300 min-h-screen">
          <div className="flex flex-wrap w-full max-h-screen overflow-auto">
            {filteredHospitals.map((hospital, index) => (
              <HospitalCard key={index} hospital={hospital} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
