import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import Spinner from "./components/Spinner/Spinner";
import { useAdminContext } from "./context/AdminContext";
import { useDoctorContext } from "./context/DoctorContext";

const App = () => {
  const { aToken, dasData } = useAdminContext();
  const { dToken, appointments } = useDoctorContext();

  useEffect(() => {
    if (!appointments || !dasData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [dasData, appointments]);

  if (!appointments && !dasData) return <Spinner />;

  return aToken || dToken ? (
    <>
      <Navbar />
      <div className="app">
        <Sidebar />
        <Routes>
          {/* ADMIN ROUTES */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* DOCTOR ROUTES */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </>
  ) : (
    <>
      <Login />
    </>
  );
};

export default App;
