import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Prescription() {
  const [patientEmail, setPatientEmail] = useState('');
  const [prescription, setPrescription] = useState('');
  const [error, setError] = useState('');
  const { name } = useParams();
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'doctor') {
      alert('Unauthorised to view this page');
      navigate('/doctor/login')
      window.location.reload();
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, patientEmail, prescription })
    };

    fetch('http://localhost:3055/doctor/prescription', requestOptions)
      .then(response => {
        if (!response.ok) {
          alert('Prescription submission unsuccessfully.');
          throw new Error('Failed to submit prescription.');
        }
        alert('Prescription submitted successfully.');
        setPatientEmail('');
        setPrescription('');
      })
      .catch(error => {
        console.error('Error submitting prescription:', error);
        setError('Failed to submit prescription. Please try again later.');
      });
  };

  return (
    <div className="prescription-form flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2">
        <h2 className="text-center text-2xl font-semibold mb-6">Create New Prescription</h2>

        <label htmlFor="patientEmail" className="block mb-2 text-gray-700 mt-4">
          Patient Email:
        </label>
        <input
          id="patientEmail"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          required
        />

        <label htmlFor="prescription" className="block mb-2 text-gray-700 mt-4">
          Prescription:
        </label>
        <textarea
          id="prescription"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 h-32"
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          placeholder="Write prescription here..."
          required
        />

        {error && (
          <div className="text-red-500 text-center mt-4">{error}</div>
        )}

        <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md mt-6 w-full">
          Submit Prescription
        </button>
      </form>
    </div>
  );
}

export default Prescription;
