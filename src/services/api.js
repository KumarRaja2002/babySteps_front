import axios from "axios";

const API_BASE_URL = "https://babysteps-hz7j.onrender.com"; // Backend API URL

export const getDoctors = () => axios.get(`${API_BASE_URL}/doctors`);
export const getAppointments = () => axios.get(`${API_BASE_URL}/appointments`);
export const getDoctorSlots = (doctorId, date) =>
  axios.get(`${API_BASE_URL}/doctors/${doctorId}/slots`);
export const createAppointment = (appointmentData) =>
  axios.post(`${API_BASE_URL}/appointments`, appointmentData);
export const updateAppointment = (id, data) =>
  axios.put(`${API_BASE_URL}/appointments/${id}`, data);
export const deleteAppointment = (id) =>
  axios.delete(`${API_BASE_URL}/appointments/${id}`);
