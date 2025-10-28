import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const PdfViewer = () => {
  const [email, setEmail] = useState('');
  const [patient, setPatient] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [error, setError] = useState('');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'doctor') {
      alert('Unauthorised to view this page');
      navigate('/doctor/login')
      window.location.reload();
    }
  })

  const handleShowPdfs = async () => {
    try {
      const response = await fetch(`http://localhost:3055/patient/${email}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        setPatient(data);
        setPdfs(data.pdfs);
      } else {
        setError('Patient not found');
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setError('Failed to fetch patient data. Please try again later.');
    }
  };

  const handleDownloadPdf = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full md:w-1/2">
        <h2 className="text-center text-2xl font-semibold mb-6">View Patient's Previous Prescriptions</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">Enter Patient Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <button
          onClick={handleShowPdfs}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md w-full mb-4"
        >
          Show PDFs
        </button>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        {pdfs.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">PDFs of {patient.name}:</h3>
            {pdfs.map((pdf, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-200 p-2 rounded-md mb-2">
                <p>PDF {index + 1}</p>
                <button
                  onClick={() => handleDownloadPdf(pdf[1])}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
