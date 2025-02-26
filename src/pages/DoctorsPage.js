import React, { useEffect, useState } from "react";
import { getDoctors } from "../services/api";
import DoctorCard from "../components/DoctorCard";
import "../styles/DoctorsPage.css";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors()
      .then((response) => {
        console.log(response);
        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="doctors-page">
      <h2>Our Doctors</h2>
      {loading ? (
        <div className="loading-container">
          <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <div className="doctor-list">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
