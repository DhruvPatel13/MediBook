import React from "react";
import topStyles from "./TopDoctors.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();
  return (
    <section className={topStyles.top_doctors}>
      <h3>Top Doctors to Book</h3>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      <div className={topStyles.card_holder}>
        {doctors.slice(0, 8).map((doc, idx) => (
          <div
            className={topStyles.card}
            key={idx}
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
              scrollTo(0, 0);
            }}
          >
            <img src={doc.image} loading="lazy" />
            <div
              className={`${topStyles.available_wrapper}
               ${doc.available ? "" : topStyles.red}
              `}
            >
              <span className={doc.available ? "" : topStyles.red}></span>
              <p className={doc.available ? "" : topStyles.red}>
                {doc.available ? "Available" : "Not Available"}
              </p>
            </div>
            <strong>{doc.name}</strong>
            <p>{doc.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDoctors;
