import { useEffect, useState } from "react";
import { getDoctors, getDoctorSlots, createAppointment } from "../services/api";
import "../styles/BookAppointmentPage.css";

function BookAppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [patientName, setPatientName] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoctors()
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    if (selectedDoctor && date) {
      getDoctorSlots(selectedDoctor, date)
        .then((response) => setSlots(response.data))
        .catch((error) => console.error("Error fetching slots:", error));
    }
  }, [selectedDoctor, date]);

  const showPopup = (message, type) => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const clearFields = () => {
    setSelectedDoctor("");
    setDate("");
    setSelectedSlot("");
    setAppointmentType("");
    setPatientName("");
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !date || !selectedSlot || !patientName || !appointmentType) {
      showPopup("Please fill in all fields", "error");
      return;
    }

    setLoading(true);
    const [hours, minutes] = selectedSlot.split(":").map(Number);
  
  // Create a new Date object from the selected date
  const selectedDateTime = new Date(date);
  selectedDateTime.setHours(hours, minutes, 0, 0); // Set the exact slot time
  
  // Format the date without converting to UTC
  const formattedDate = selectedDateTime.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata", // Ensures IST time
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  });

  console.log("Final Booking Time (Local):", formattedDate);

    const appointmentData = {
      doctor_id: selectedDoctor,
      date: formattedDate,
      duration: 30,
      appointment_type: appointmentType,
      patient_name: patientName,
    };

    console.log("Booking Request:", appointmentData);

    createAppointment(appointmentData)
      .then(() => {
        showPopup("Appointment booked successfully!", "success");
        clearFields();
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
        showPopup(error.response?.data?.message || "Slot booking failed", "error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="book-appointment-container">
      <h2>Book an Appointment</h2>

      {popup.message && <div className={`popup ${popup.type}`}>{popup.message}</div>}

      <h3>Doctor</h3>
      <select onChange={(e) => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
        <option value="">Select Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <h3>Date</h3>
      <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />

      <h3>Available Slots</h3>
      <select onChange={(e) => setSelectedSlot(e.target.value)} value={selectedSlot}>
        <option value="">Select Slot</option>
        {slots.length > 0 ? (
          slots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))
        ) : (
          <option disabled>No Slots Available</option>
        )}
      </select>

      <h3>Appointment Type</h3>
      <input type="text" onChange={(e) => setAppointmentType(e.target.value)} value={appointmentType} />

      <h3>Patient Name</h3>
      <input type="text" onChange={(e) => setPatientName(e.target.value)} value={patientName} />

      <button onClick={handleBookAppointment} disabled={loading}>
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </div>
  );
}

export default BookAppointmentPage;
