import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./doctor.css";

const DoctorDetails = ({ doctors }) => {
  const { rollNo } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((doc) => doc.rollNo === rollNo);

  if (!doctor) {
    return <h2>Doctor Not Found</h2>;
  }

  return (
    <div className="doctor-details">
      
      <div className="doctor-image">
        {doctor.image ? (
          <img src={doctor.image} alt={doctor.name} />
        ) : (
          <div className="default-profile">{doctor.name.charAt(0).toUpperCase()}</div>
        )}
      </div>

   
      <h1>{doctor.name}</h1>
      <span className="specialization">{doctor.specialty}</span>
      <p><strong>Institution:</strong> {doctor.institution}</p>
      <p><strong>Clinic:</strong> {doctor.clinic}</p>
      <p><strong>City:</strong> {doctor.city}</p>
      <p><strong>Contact:</strong> {Array.isArray(doctor.contact) ? doctor.contact.join(", ") : doctor.contact}</p>

      <button className="back-button" onClick={() => navigate(-1)}>🔙 Back</button>
    </div>
  );
};

export default DoctorDetails;
