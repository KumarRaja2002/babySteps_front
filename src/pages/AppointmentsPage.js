import { useEffect, useState } from "react";
import { getAppointments, deleteAppointment, updateAppointment } from "../services/api";
import AppointmentCard from "../components/AppointmentCard";
import "../styles/AppointmentsPages.css";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Error messages
  const [successMessage, setSuccessMessage] = useState(""); // Success messages
  const [originalDate, setOriginalDate] = useState(""); // Store the original date
  const [saving, setSaving] = useState(false); // Loader state for save button

  const [updatedAppointment, setUpdatedAppointment] = useState({
    doctor_id: "",
    duration: 30,
    appointment_type: "",
    patient_name: "",
    notes: "",
    date: "",
  });

  useEffect(() => {
    getAppointments()
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  }, []);

  const showSuccessPopup = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter((a) => a._id !== id));
      showSuccessPopup("Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEditClick = (appointment) => {
    setErrorMessage(""); // Reset error messages
    setSuccessMessage(""); // Reset success messages
    setSelectedAppointment(appointment);
    
    const formattedDate = appointment.date ? appointment.date.split("T")[0] : "";
    setOriginalDate(formattedDate); // Store original date

    setUpdatedAppointment({
      doctor_id: appointment.doctor_id?._id || appointment.doctor_id,
      duration: appointment.duration,
      appointment_type: appointment.appointment_type,
      patient_name: appointment.patient_name,
      notes: appointment.notes || "",
      date: formattedDate,
    });

    setEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setSaving(true); // Show loader on save button
      setErrorMessage(""); // Reset errors
      setSuccessMessage(""); // Reset success messages

      let updatedData = { ...updatedAppointment };

      // Remove date from request if it's not changed
      if (updatedData.date === originalDate) {
        delete updatedData.date;
      }

      const response = await updateAppointment(selectedAppointment._id, updatedData);
      setAppointments(
        appointments.map((a) => (a._id === selectedAppointment._id ? response.data : a))
      );
      setEditModalOpen(false);
      showSuccessPopup("Appointment updated successfully.");
    } catch (error) {
      console.error("Error updating appointment:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Failed to update appointment. Please try again.");
    } finally {
      setSaving(false); // Hide loader after update completes
    }
  };

  return (
    <div className="appointments-container">
      <h2>Appointments List</h2>

      {/* Success Message Popup */}
      {successMessage && (
        <div className="success-popup">
          <p>{successMessage}</p>
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-circle"></div>
          <p>Loading appointments...</p>
        </div>
      ) : (
        <div className="appointment-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onDelete={handleDelete}
                onUpdate={handleEditClick}
              />
            ))
          ) : (
            <p className="no-appointments">No appointments available</p>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Appointment</h3>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="modal-inputs">
              <label>Doctor ID:</label>
              <input
                type="text"
                value={updatedAppointment.doctor_id}
                onChange={(e) =>
                  setUpdatedAppointment({ ...updatedAppointment, doctor_id: e.target.value })
                }
              />
              <label>Duration (mins):</label>
              <input
                type="number"
                value={updatedAppointment.duration}
                onChange={(e) =>
                  setUpdatedAppointment({ ...updatedAppointment, duration: e.target.value })
                }
              />
              <label>Appointment Type:</label>
              <input
                type="text"
                value={updatedAppointment.appointment_type}
                onChange={(e) =>
                  setUpdatedAppointment({ ...updatedAppointment, appointment_type: e.target.value })
                }
              />
              <label>Patient Name:</label>
              <input
                type="text"
                value={updatedAppointment.patient_name}
                onChange={(e) =>
                  setUpdatedAppointment({ ...updatedAppointment, patient_name: e.target.value })
                }
              />
              <label>Notes:</label>
              <textarea
                value={updatedAppointment.notes}
                onChange={(e) =>
                  setUpdatedAppointment({ ...updatedAppointment, notes: e.target.value })
                }
              />
              <label>Date:</label>
              <input
                type="date"
                value={updatedAppointment.date}
                onChange={(e) =>
                  setUpdatedAppointment({ ...updatedAppointment, date: e.target.value })
                }
              />
            </div>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleUpdate} disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
              <button className="cancel-btn" onClick={() => setEditModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;
