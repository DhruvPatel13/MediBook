import React from "react";
import specialtyStyles from "./SpecialtyMenu.module.css";
import { specialtyData } from "../../assets/assets";
import { Link } from "react-router-dom";

const SpecialtyMenu = () => {
  return (
    <section className={specialtyStyles.specialty}>
      <h3>Find by Specialty</h3>
      <p>
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className={specialtyStyles.specialty_links_holder}>
        {specialtyData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.specialty}`}
            className={specialtyStyles.specialty_link}
          >
            <img src={item.image} loading="lazy" />
            <p>{item.specialty}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialtyMenu;
