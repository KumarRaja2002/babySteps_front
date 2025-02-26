import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/AppointmentsPages.css";

function AppointmentCard({ appointment, onDelete, onUpdate }) {
  if (!appointment) {
    return <p className="error-message">Error: Appointment data is missing.</p>;
  }

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <h3>{appointment?.patient_name || "Unknown Patient"}</h3>
        <div className="appointment-icons">
          <FaEdit className="edit-icon" onClick={() => onUpdate(appointment)} />
          <FaTrash className="delete-icon" onClick={() => onDelete(appointment?._id)} />
        </div>
      </div>

      <p><strong>Appointment Type:</strong> {appointment?.appointment_type || "N/A"}</p>
      <p><strong>Date:</strong> {appointment?.date ? new Date(appointment.date).toISOString() : "No Date Provided"}</p>
      <p><strong>Duration:</strong> {appointment?.duration ? `${appointment.duration} mins` : "N/A"}</p>

      <hr />

      <h4>Doctor Details</h4>
      <p><strong>Name:</strong> {appointment?.doctor_id?.name || "Unknown Doctor"}</p>
      <p>
        <strong>Working Hours:</strong> 
        {appointment?.doctor_id?.working_hours?.start
          ? `${appointment?.doctor_id?.working_hours?.start} - ${appointment?.doctor_id?.working_hours?.end}`
          : "Not Available"}
      </p>
    </div>
  );
}

export default AppointmentCard;
