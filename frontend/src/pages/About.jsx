import React from "react";
import aboutStyles from "./Css/About.module.css";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <section className={aboutStyles.about}>
      <h2><span>ABOUT</span> US</h2>
      <section className={aboutStyles.about_banner}>
        <figure className={aboutStyles.banner_left}>
          <img src={assets.about_image} loading="lazy" />
        </figure>
        <div className={aboutStyles.banner_right}>
          <p>
            Welcome to MediBook, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At MediBook, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            MediBook is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, MediBook is here to support you every step of the
            way.
          </p>
          <strong>Our Vision</strong>
          <p>
            Our vision at MediBook is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </section>
      <section className={aboutStyles.benefits_section}>
        <h3>WHY CHOOSE US?</h3>
        <div className={aboutStyles.benefits}>
          <div className={aboutStyles.box}>
            <figure className={aboutStyles.benefits_img_holder}>
              <img src={assets.efficiency_icon} loading="lazy" />
            </figure>
            <p>EFFICIENCY</p>
            <span>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </span>
          </div>
          <div className={aboutStyles.box}>
            <figure className={aboutStyles.benefits_img_holder}>
              <img src={assets.convenience_icon} loading="lazy" />
            </figure>
            <p>CONVENIENCE</p>
            <span>
              Access to a network of trusted healthcare professionals in your
              area.
            </span>
          </div>
          <div className={aboutStyles.box}>
            <figure className={aboutStyles.benefits_img_holder}>
              <img src={assets.personalization_icon} loading="lazy" />
            </figure>
            <p>PERSONALIZATION</p>
            <span>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </span>
          </div>
        </div>
      </section>
      <section className={aboutStyles.info_section}>
        <div className={aboutStyles.info_left}>
          <div className={aboutStyles.info_text_holder}>
            <h4>50+</h4>
            <span>Qualified Doctors</span>
          </div>
          <div className={aboutStyles.info_text_holder}>
            <h4>5</h4>
            <span>Years of Service</span>
          </div>
        </div>
        <div className={aboutStyles.info_right}>
          <div className={aboutStyles.info_text_holder}>
            <h4>6</h4>
            <span>Specialties Available</span>
          </div>
          <div className={aboutStyles.info_text_holder}>
            <h4>100+</h4>
            <span>Satisfied Patients</span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
