import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleViewSlots = () => {
    navigate(`/doctor/${doctor._id}/slots`);
  };

  return (
    <div className="doctor-card">
      <div className="doctor-header">
        <h3>{doctor.name}</h3>
      </div>
      <div className="doctor-body">
        <p>
          <strong>Working Hours:</strong> {doctor.working_hours.start} -{" "}
          {doctor.working_hours.end}
        </p>
      </div>
      <div className="doctor-footer">
        <button className="book-btn" onClick={handleViewSlots}>
          View Slots
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
