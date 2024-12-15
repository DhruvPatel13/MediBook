import React from "react";
import heroStyles from "./Hero.module.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.bubbles}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={heroStyles.hero_left}>
        <h2>Book Appointment With Trusted Doctors</h2>
        <div className={heroStyles.left_text_holder}>
          <img src={assets.group_profiles} loading="lazy" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <button onClick={() => navigate("/doctors")}>
          Book Appointment &rarr;
        </button>
      </div>
      <div className={heroStyles.hero_right}>
        <figure className={heroStyles.img_wrapper}>
          <img src={assets.hero_banner} loading="lazy" />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
