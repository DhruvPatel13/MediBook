import React, { useEffect, useState } from "react";
import docStyles from "./Css/Doctors.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Doctors = () => {
  const { doctors } = useAppContext();
  const [filterDoc, setFilterDoc] = useState([]);

  const { specialty } = useParams();
  const navigate = useNavigate();

  const applyFilter = () => {
    if (specialty) {
      setFilterDoc(doctors.filter((doc) => doc.specialty === specialty));
    } else {
      setFilterDoc(doctors);
    }
  };
  const toggleShowFilter = () => {
    if (window.innerWidth > 791) return;
    document.getElementById("filter_img").classList.toggle(docStyles.active);
    document.getElementById("filter").classList.toggle(docStyles.active);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, specialty]);

  return (
    <section className={docStyles.doctors}>
      <aside className={docStyles.filter_holder}>
        <div onClick={toggleShowFilter} className={docStyles.filter_title}>
          Filters
          <img src={assets.arrow_img} loading="lazy" id="filter_img" />
        </div>
        <div className={docStyles.filter} id="filter">
          <p
            onClick={() =>
              specialty === "General physician"
                ? navigate("/doctors/")
                : navigate("/doctors/General physician")
            }
            className={
              specialty === "General physician" ? docStyles.active : ""
            }
          >
            General physician
          </p>
          <p
            onClick={() =>
              specialty === "Gynecologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Gynecologist")
            }
            className={specialty === "Gynecologist" ? docStyles.active : ""}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              specialty === "Dermatologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Dermatologist")
            }
            className={specialty === "Dermatologist" ? docStyles.active : ""}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              specialty === "Pediatricians"
                ? navigate("/doctors/")
                : navigate("/doctors/Pediatricians")
            }
            className={specialty === "Pediatricians" ? docStyles.active : ""}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              specialty === "Neurologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Neurologist")
            }
            className={specialty === "Neurologist" ? docStyles.active : ""}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              specialty === "Gastroenterologist"
                ? navigate("/doctors/")
                : navigate("/doctors/Gastroenterologist")
            }
            className={
              specialty === "Gastroenterologist" ? docStyles.active : ""
            }
          >
            Gastroenterologist
          </p>
        </div>
      </aside>
      <section className={docStyles.card_holder}>
        {filterDoc.map((doc, idx) => (
          <div
            className={docStyles.card}
            key={idx}
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
              scrollTo(0, 0);
            }}
          >
            <img src={doc.image} loading="lazy" />
            <div
              className={`${docStyles.available_wrapper}
               ${doc.available ? "" : docStyles.red}
              `}
            >
              <span className={doc.available ? "" : docStyles.red}></span>
              <p className={doc.available ? "" : docStyles.red}>
                {doc.available ? "Available" : "Not Available"}
              </p>
            </div>
            <strong>{doc.name}</strong>
            <p>{doc.specialty}</p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Doctors;
