import React, { useEffect } from "react";
import dashStyles from "../Css/Dashboard.module.css";
import docAppStyle from "../Css/DoctorAppointments.module.css"
import { useAppContext } from "../../context/AppContext";
import { useDoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useDoctorContext();
  const { currency, slotDateFormat } = useAppContext();

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  return (
    dashData && (
      <section className={dashStyles.admin_dashboard}>
        <article className={dashStyles.article1}>
          <figure className={dashStyles.dash_img_holder}>
            <img src={assets.earning_icon} loading="lazy" />
            <figcaption className={dashStyles.figure_text}>
              <p>
                {currency} {dashData.earnings}
              </p>
              <p>Earnings</p>
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
                  <img src={item.userData.image} loading="lazy" />
                </figure>
                <p>{item.userData.name}</p>
                <p>{slotDateFormat(item.slotDate)}</p>
                {/* new */}
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
          </div>
        </article>
      </section>
    )
  );
};

export default DoctorDashboard;
