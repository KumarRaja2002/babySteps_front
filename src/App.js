import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import DoctorSlotsPage from "./pages/DoctorSlotsPage";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>BabySteps Clinic</h1>
          <ul>
            <li><Link to="/">Doctors</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><Link to="/book-appointment">Book Appointment</Link></li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<DoctorsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/book-appointment" element={<BookAppointmentPage />} />
            <Route path="/doctor/:doctorId/slots" element={<DoctorSlotsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
