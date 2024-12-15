import React, { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";
import listStyles from "../Css/DoctorsList.module.css";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useAdminContext();

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <section className={listStyles.list_page}>
      <h1>Doctor's List</h1>
      <div className={listStyles.card_holder}>
        {doctors.map((doc, idx) => (
          <div className={listStyles.card} key={idx}>
            <figure className={listStyles.card_img_holder}>
              <img src={doc.image} loading="lazy" />
            </figure>
            <div className={listStyles.text_holder}>
              <p>{doc.name}</p>
              <span>{doc.specialty}</span>
            </div>
            <div className={listStyles.input_holder}>
              <input
                onChange={() => changeAvailability(doc._id)}
                type="checkbox"
                checked={doc.available}
              />
              <label className={doc.available? ""  : listStyles.active}>
                {doc.available ? "Available" : "Not Available"}
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorsList;
