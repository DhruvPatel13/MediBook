import React from "react";
import navStyles from "./Navbar.module.css";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";
import { useDoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useAdminContext();
  const { dToken, setDToken } = useDoctorContext();

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };
  
  return (
    <nav className={navStyles.navbar}>
      <figure className={navStyles.logo_holder}>
        <img src={assets.admin_logo} loading="lazy" />
        <figcaption>{aToken ? "Admin" : "Doctor"}</figcaption>
      </figure>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
