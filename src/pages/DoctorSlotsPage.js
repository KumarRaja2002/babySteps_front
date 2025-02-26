import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorSlots } from "../services/api";
import "../styles/DoctorSlotsPage.css";

const DoctorSlotsPage = () => {
  const { doctorId } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const date = new Date().toISOString().split("T")[0]; // Get today's date
        const response = await getDoctorSlots(doctorId, date);
        setSlots(response.data);
      } catch (err) {
        setError("Failed to fetch slots.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [doctorId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="dot-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="slots-page">
      <h2>Available Slots</h2>
      <div className="slots-container">
        {slots.length > 0 ? (
          slots.map((slot, index) => (
            <button key={index} className="slot-btn">
              {slot}
            </button>
          ))
        ) : (
          <p>No slots available</p>
        )}
      </div>
    </div>
  );
};

export default DoctorSlotsPage;
