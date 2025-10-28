import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const mail = localStorage.getItem('email');
  const role = localStorage.getItem('role');

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'patient') {
      alert('Unauthorised to view this page');
      navigate('/doctor/login')
      window.location.reload();
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3055/patient/${mail}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setPatient(data);
          const lastPrescription = data.prescriptions.slice(-1)[0];
          setPrescription(lastPrescription);
          setUploadedPDFs(data.pdfs);
          const lastAppointment = data.appointments.length > 0 ? data.appointments.slice(-1)[0] : [];
          setAppointment(lastAppointment);
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData();
  }, []);

  const submitPdf = async () => {
    try {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile);
      const response = await fetch(`http://localhost:3055/patient/sendPdf/${mail}/${patient.doctorEmail}`, {
        method: 'POST',
        body: formData,
      });
      const newData = await response.json();
      alert('Pdf submitted successfully!');
      console.log('PDF submitted:', response);
      setPdfFile(null);
      setUploadedPDFs(newData.pdfs);
      window.location.reload();
    } catch (error) {
      alert('Unable to submit pdf!');
      console.error('Error submitting PDF:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Patient Profile</h1>
      </div>
      <div className="flex flex-1">
        <div className="w-1/2 p-4">
          <div className="mb-4 pb-14">
            <h2 className="text-lg font-bold text-center">Personal Information</h2>
            <p className="text-center">Name: {patient?.name}</p>
            <p className="text-center">Email: {patient?.email}</p>
            <p className="text-center">Phone: {patient?.phoneNo}</p>
          </div>
          <div className="mb-4 border-2 border-gray-800 rounded-lg text-center mx-auto">
          <h2 className="text-lg font-bold text-center text-red-500">Your Appointment Information</h2>
          {appointment.length > 0 ? (
            <>
              <p className="text-center">Hospital Name: {appointment[0]}</p>
              <p className="text-center">Doctor Name: {appointment[1]}</p>
              <p className="text-center">Estimated Time: {appointment[2]}</p>
            </>
          ) : (
            <p className="text-center">No appointment scheduled</p>
          )}
        </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-center">Latest Prescription</h2>
            {prescription && (
              <div className="border border-gray-300 p-4 rounded">
                <p>From Doctor: {prescription.doctorName}</p>
                <p>Date: {new Date(prescription.date).toLocaleDateString()}</p>
                <p>{prescription.prescription}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-center mb-4">Submit PDF</h2>
            <input type="file" onChange={e => setPdfFile(e.target.files[0])} className="mb-2 mx-auto" />
            <button onClick={submitPdf} className="bg-blue-500 text-white px-4 py-2 rounded mx-auto hover:bg-blue-700">Submit PDF</button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-center">Uploaded PDFs</h2>
            {uploadedPDFs && uploadedPDFs.length > 0 && (
              uploadedPDFs.map((pdf, index) => (
                <div key={index} className="text-center mt-4 mb-4">
                  <a href={pdf && pdf.length >= 2 ? pdf[1] : ''} target="_blank"  download={`pdf_${index + 1}`} className="bg-blue-500 text-white px-4 py-2 rounded mx-auto mb-2 hover:bg-blue-700">Download PDF {index + 1}</a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
