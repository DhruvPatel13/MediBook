import React, { useEffect } from "react";
import docAppStyle from "../Css/DoctorAppointments.module.css";
import { useDoctorContext } from "../../context/DoctorContext";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useDoctorContext();
  const { calculateAge, slotDateFormat, currency } = useAppContext();

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);
  
  return (
    <section className={docAppStyle.doctor_appointments}>
      <h1>All Appointments</h1>
      <article className={docAppStyle.list_holder}>
        <div className={docAppStyle.list_title}>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.reverse().map((item, idx) => (
          <div className={docAppStyle.appointment_card} key={idx}>
            <p>{idx + 1}</p>
            <figure className={docAppStyle.card_img_holder}>
              <img src={item.userData.image} loading="lazy" />
              <figcaption>{item.userData.name}</figcaption>
            </figure>
            <p data-label="Payment:">{item.payment ? "ONLINE" : "CASH"}</p>
            <p data-label="Age:">{calculateAge(item.userData.dob)}</p>
            <p data-label="Date & Time:">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p data-label="Fees:">
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className={docAppStyle.red}>Cancelled</p>
            ) : item.isCompleted ? (
              <p className={docAppStyle.green}>Completed</p>
            ) : (
              <figure className={docAppStyle.action_imgs_holder}>
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  loading="lazy"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  loading="lazy"
                />
              </figure>
            )}
          </div>
        ))}
      </article>
    </section>
  );
};

export default DoctorAppointments;
