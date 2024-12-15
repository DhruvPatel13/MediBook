import React from "react";
import footStyles from "./Footer.module.css";
import { assets } from "../../assets/assets";

const Footer = () => (
  <footer className={footStyles.footer}>
    <div className={footStyles.wrapper}>
      <div className={footStyles.wrapper_left}>
        <img src={assets.logo} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
          non site molestiae at gusto minima capitate corpora, ration solita
          quos null ut sit nunquam nude ecus lilo presenting maigres, durius
          exercitation! Temporizes labrum imped quadrat, inventor officio
          capitate Ecus tempera orem ipsum dolor sit amet.
        </p>
      </div>
      <div className={footStyles.wrapper_center}>
        <h4>COMPANY</h4>
        <div className={footStyles.text_holder}>
          <p>Home</p>
          <p>About us</p>
          <p>FAQ's</p>
          <p>Privacy policy</p>
        </div>
      </div>
      <div className={footStyles.wrapper_right}>
        <h4>GET IN TOUCH</h4>
        <div className={footStyles.text_holder}>
          <p>+91 12345-67890</p>
          <p>dhruvpatel425122@gmail.com</p>
        </div>
        <figure className={footStyles.contact_imgs}>
          <img src={assets.linkedin_icon} loading="lazy" />
          <img src={assets.twitter_icon} loading="lazy" />
          <img src={assets.facebook_icon} loading="lazy" />
        </figure>
      </div>
    </div>
    <hr />
    <h5>Copyright 2024 &copy; DoctorApp.com - All Right Reserved.</h5>
  </footer>
);

export default Footer;
