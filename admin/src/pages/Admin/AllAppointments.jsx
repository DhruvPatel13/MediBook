import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useAdminContext } from "../../context/AdminContext";
import appStyles from "../Css/AllAppointments.module.css";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useAdminContext();
  const { calculateAge, slotDateFormat, currency } = useAppContext();

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <section className={appStyles.all_appointments}>
      <h1>All Appointments</h1>
      <article className={appStyles.list_holder}>
        <div className={appStyles.list_title}>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, idx) => (
          <div className={appStyles.appointment_card} key={idx}>
            <div className={appStyles.user_info}>
              <p>{idx + 1}</p>
              <figure className={appStyles.card_img_holder}>
                <img src={item.userData.image} loading="lazy" />
                <figcaption>{item.userData.name}</figcaption>
              </figure>
              <p data-label="Age:" >{calculateAge(item.userData.dob)}</p>
              <p data-label="Timing:">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
            </div>
            {/* doc info */}
            <div className={appStyles.doc_info}>
              <figure className={appStyles.card_img_holder}>
                <img src={item.docData.image} loading="lazy" />
                <figcaption>{item.docData.name}</figcaption>
              </figure>
              <p>
                {currency} {item.amount}
              </p>
            </div>
            {item.cancelled ? (
              <p className={appStyles.red}>Cancelled</p>
            ) : item.isCompleted ? (
              <p className={appStyles.green}>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                src={assets.cancel_icon}
                loading="lazy"
              />
            )}
          </div>
        ))}
      </article>
    </section>
  );
};

export default AllAppointments;
