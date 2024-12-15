import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import { useAppContext } from "./context/AppContext";
import Spinner from "./components/Spinner/Spinner";

const App = () => {
  const { loading } = useAppContext();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  if (loading) return <Spinner textVisible={true}/>;
  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:specialty" element={<Doctors />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="my-profile" element={<Profile />} />
          <Route path="/appointment/:docId" element={<BookAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
