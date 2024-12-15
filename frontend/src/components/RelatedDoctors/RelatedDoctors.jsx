import React, { useEffect, useState } from "react";
import relStyles from "./Related.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const RelatedDoctors = ({ docId, specialty }) => {
  const { doctors } = useAppContext();
  const navigate = useNavigate();

  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && specialty) {
      const doctorsData = doctors.filter(
        (doc) => doc.specialty === specialty && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, specialty, docId]);
  return (
    <section className={relStyles.related_section}>
      <h3>Related Doctors</h3>
      <p>Simply browse through our extensive list of trusted doctors.</p>
      <div className={relStyles.card_holder}>
        {relDoc.slice(0, 4).map((doc, idx) => (
          <div
            className={relStyles.card}
            key={idx}
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
              scrollTo(0, 0);
            }}
          >
            <img src={doc.image} loading="lazy" />
            <div
              className={`${relStyles.available_wrapper}
             ${doc.available ? "" : relStyles.red}
            `}
            >
              <span className={doc.available ? "" : relStyles.red}></span>
              <p className={doc.available ? "" : relStyles.red}>
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

export default RelatedDoctors;
