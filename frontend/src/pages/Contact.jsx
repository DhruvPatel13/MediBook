import React from "react";
import conStyles from "./Css/Contact.module.css";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <section className={conStyles.contact}>
      <figure className={conStyles.banner}>
        <img
          src={
            window.innerWidth < 768 ? assets.contact_image : assets.contact_img
          }
          loading="lazy"
        />
      </figure>
      <section className={conStyles.form_holder}>
        <div className={conStyles.form_left}>
          <h4>Get in Touch</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            quia Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
          </p>
          <p>Suite 527-768 Kandice Roads, Lake Gregory, AR 64873</p>
          <p>Tel: +(00) 00000-00000</p>
          <p>E-mail: MediBook@gmail.com</p>
        </div>
        <div className={conStyles.form_right}>
          <form>
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your email" />
            <input type="text" placeholder="Your phone" />
            <textarea rows={4} cols={50} placeholder="Your Query"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Contact;
