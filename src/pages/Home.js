import React, { useState } from "react";
import DoctorList from "../components/DoctorList";
import AppointmentList from "../components/AppointmentList";

const Home = () => {
  const [showDoctors, setShowDoctors] = useState(true);

  return (
    <div>
      <h1>Appointment Booking System</h1>
      <button onClick={() => setShowDoctors(!showDoctors)}>
        {showDoctors ? "View Appointments" : "View Doctors"}
      </button>
      {showDoctors ? <DoctorList /> : <AppointmentList />}
    </div>
  );
};

export default Home;
