import React, { useState, useEffect } from "react";
import navStyles from "./Navbar.module.css";
import { assets } from "../../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Navbar = () => {
  const { token, setToken, adminUrl } = useAppContext();

  const [visible, setVisible] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [menu, setMenu] = useState(sessionStorage.getItem("menu") || "home");

  const navigate = useNavigate();

  const logout = () => {
    setShowProfileOptions(!showProfileOptions);
    setToken(false);
    localStorage.removeItem("token");
  };
  const menuHandler = (menu) => {
    setMenu(menu);
    sessionStorage.setItem("menu", menu);
  };

  useEffect(() => {
    const storedMenu = localStorage.getItem("menu");
    if (storedMenu) setMenu(storedMenu);
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible, menu]);

  return (
    <nav className={navStyles.navbar}>
      <div className={navStyles.navbar_left}>
        <img
          src={assets.logo}
          loading="lazy"
          onClick={() => {
            navigate("/");
            menuHandler("home");
          }}
        />
      </div>
      <div className={navStyles.navbar_center}>
        <ul className={navStyles.navbar_menu}>
          <li className={menu === "home" ? navStyles.active : ""}>
            <NavLink to={"/"} onClick={() => menuHandler("home")}>
              HOME
            </NavLink>
          </li>
          <li className={menu === "all doctors" ? navStyles.active : ""}>
            <NavLink to={"/doctors"} onClick={() => menuHandler("all doctors")}>
              ALL DOCTORS
            </NavLink>
          </li>
          <li className={menu === "about" ? navStyles.active : ""}>
            <NavLink to={"/about"} onClick={() => menuHandler("about")}>
              ABOUT
            </NavLink>
          </li>
          <li className={menu === "contact" ? navStyles.active : ""}>
            <NavLink to={"/contact"} onClick={() => menuHandler("contact")}>
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={navStyles.navbar_right}>
        <button className={navStyles.admin}>
          <a href={adminUrl} target="_blank">
            Admin Panel &rarr;
          </a>
        </button>
        {token ? (
          <img
            src={assets.profile_pic}
            loading="lazy"
            onClick={() => setShowProfileOptions(!showProfileOptions)}
          />
        ) : (
          <button onClick={() => navigate("/login")}>Sign Up</button>
        )}
        <div className={navStyles.nav_profile_holder}>
          <ul
            className={`${navStyles.nav_profile}
             ${showProfileOptions ? navStyles.active : ""}
            `}
          >
            <li
              onClick={() => (
                navigate("/my-profile"),
                setShowProfileOptions(!showProfileOptions)
              )}
            >
              My Profile
            </li>
            <li
              onClick={() => (
                navigate("/my-appointments"),
                setShowProfileOptions(!showProfileOptions)
              )}
            >
              My Appointments
            </li>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>
        <img
          src={assets.menu_icon}
          loading="lazy"
          onClick={() => setVisible(!visible)}
        />
      </div>
      {/* menu for mobile */}
      <div
        className={`${navStyles.mobile_menu_holder} 
      ${visible ? navStyles.active : ""} 
      `}
      >
        <div className={navStyles.nav}>
          <button onClick={() => navigate("#")}>
            <a href={adminUrl} target="_blank">
              Admin Panel &rarr;
            </a>
          </button>
          <img
            src={assets.cross_icon}
            loading="lazy"
            onClick={() => setVisible(!visible)}
          />
        </div>
        <ul className={navStyles.mobile_menu}>
          <li className={menu === "home" ? navStyles.active : ""}>
            <NavLink
              to={"/"}
              onClick={() => (menuHandler("home"), setVisible(!visible))}
            >
              HOME
            </NavLink>
          </li>
          <li className={menu === "all doctors" ? navStyles.active : ""}>
            <NavLink
              to={"/doctors"}
              onClick={() => (menuHandler("all doctors"), setVisible(!visible))}
            >
              ALL DOCTORS
            </NavLink>
          </li>
          <li className={menu === "about" ? navStyles.active : ""}>
            <NavLink
              to={"/about"}
              onClick={() => (menuHandler("about"), setVisible(!visible))}
            >
              ABOUT
            </NavLink>
          </li>
          <li className={menu === "contact" ? navStyles.active : ""}>
            <NavLink
              to={"/contact"}
              onClick={() => (menuHandler("contact"), setVisible(!visible))}
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
