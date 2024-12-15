import React from "react";
import banStyles from "./Banner.module.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
  return (
    <section className={banStyles.banner}>
      <div className={banStyles.animated_bg}>
        <div className={banStyles.shape}></div>
        <div className={banStyles.shape}></div>
        <div className={banStyles.shape}></div>
      </div>
      <div className={banStyles.banner_left}>
        <h2>Book Appointment With 100+ Trusted Doctors</h2>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          Create Account&rarr;
        </button>
      </div>
      <figure className={banStyles.banner_right}>
        <img src={assets.appointment_img} loading="lazy" />
      </figure>
    </section>
  );
};

export default Banner;
