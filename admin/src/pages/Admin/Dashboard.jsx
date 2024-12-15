import React, { useEffect } from "react";
import dashStyles from "../Css/Dashboard.module.css";
import { assets } from "../../assets/assets";
import { useAdminContext } from "../../context/AdminContext";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useAdminContext();
  const { slotDateFormat } = useAppContext();

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <section className={dashStyles.admin_dashboard}>
        <article className={dashStyles.article1}>
          <figure className={dashStyles.dash_img_holder}>
            <img src={assets.doctor_icon} loading="lazy" />
            <figcaption className={dashStyles.figure_text}>
              <p>{dashData.doctors}</p>
              <p>{dashData.doctors < 2 ? "Doctor" : "Doctors"}</p>
            </figcaption>
          </figure>
          <figure className={dashStyles.dash_img_holder}>
            <img src={assets.appointments_icon} loading="lazy" />
            <figcaption className={dashStyles.figure_text}>
              <p>{dashData.appointments}</p>
              <p>
                {dashData.appointments < 2 ? "Appointment" : "Appointments"}
              </p>
            </figcaption>
          </figure>
          <figure className={dashStyles.dash_img_holder}>
            <img src={assets.patients_icon} loading="lazy" />
            <figcaption className={dashStyles.figure_text}>
              <p>{dashData.patients}</p>
              <p>{dashData.patients < 2 ? "Patient" : "Patients"}</p>
            </figcaption>
          </figure>
        </article>
        <article className={dashStyles.article2}>
          <figure className={dashStyles.title_img_holder}>
            <img src={assets.list_icon} loading="lazy" />
            <figcaption>Latest Bookings</figcaption>
          </figure>
          <div className={dashStyles.list_holder}>
            {dashData.latestAppointments.map((item, idx) => (
              <div className={dashStyles.list} key={idx}>
                <figure className={dashStyles.list_img_holder}>
                  <img src={item.docData.image} loading="lazy" />
                </figure>
                <p>{item.docData.name}</p>
                <p>{slotDateFormat(item.slotDate)}</p>
                {item.cancelled ? (
                  <p className={dashStyles.red}>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className={dashStyles.green}>Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </article>
      </section>
    )
  );
};

export default Dashboard;
