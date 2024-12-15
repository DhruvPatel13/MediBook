import React from "react";
import sideStyles from "./Sidebar.module.css";
import { useAdminContext } from "../../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useDoctorContext } from "../../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useAdminContext();
  const { dToken } = useDoctorContext();
  
  return (
    <aside className={sideStyles.sidebar}>
      {aToken && (
        <ul className={sideStyles.options_holder}>
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `${isActive ? sideStyles.active : ""}  ${sideStyles.option}`
            }
          >
            <img src={assets.home_icon} loading="lazy" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `${isActive ? sideStyles.active : ""}  ${sideStyles.option}`
            }
          >
            <img src={assets.appointment_icon} loading="lazy" />
            <span>Appointments</span>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `${isActive ? sideStyles.active : ""}  ${sideStyles.option}`
            }
          >
            <img src={assets.add_icon} loading="lazy" />
            <span>Add Doctor</span>
          </NavLink>
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `${isActive ? sideStyles.active : ""}  ${sideStyles.option}`
            }
          >
            <img src={assets.people_icon} loading="lazy" />
            <span>Doctors List</span>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className={sideStyles.options_holder}>
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `${isActive ? sideStyles.active : ""}  ${sideStyles.option}`
            }
          >
            <img src={assets.home_icon} loading="lazy" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `${isActive ? sideStyles.active : ""}  ${sideStyles.option}`
            }
          >
            <img src={assets.appointment_icon} loading="lazy" />
            <span>Appointments</span>
          </NavLink>
          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `${isActive ? sideStyles.active : ""}  ${sideStyles.option}`
            }
          >
            <img src={assets.people_icon} loading="lazy" />
            <span>Profile</span>
          </NavLink>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
