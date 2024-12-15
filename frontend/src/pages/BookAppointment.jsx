import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import bookStyles from "./Css/Book.module.css";
import RelatedDoctors from "../components/RelatedDoctors/RelatedDoctors";

const Appointment = () => {
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useAppContext();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const { docId } = useParams();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }
    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <main className={bookStyles.book_appointment}>
        <section className={bookStyles.doctor_info_holder}>
          <figure className={bookStyles.doc_img_holder}>
            <img src={docInfo.image} loading="lazy" />
          </figure>
          <div className={bookStyles.doc_info}>
            <h3>
              {docInfo.name} <img src={assets.verified_icon} loading="lazy" />{" "}
            </h3>
            <div className={bookStyles.doc_speciality}>
              <p>
                {docInfo.degree} - {docInfo.specialty}
              </p>
              <span>{docInfo.experience}</span>
            </div>

            <div className={bookStyles.doc_about}>
              <p>
                About <img src={assets.info_icon} loading="lazy" />
              </p>
              <p>{docInfo.about}</p>
            </div>
            <p>
              Appointment fee:{" "}
              <span>
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </section>
        {/* section 2 */}
        <section className={bookStyles.slots_section}>
          <h5>Slots Bookings</h5>
          <div className={bookStyles.slots_dates}>
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`${bookStyles.dates_holder} 
                  ${slotIndex === index ? bookStyles.active : ""}
                  `}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className={bookStyles.slots_time_holder}>
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`${bookStyles.slots_time}
                   ${item.time === slotTime ? bookStyles.active : ""}
                  `}
                  key={index}
                >
                  {item.time.toLowerCase().toString()}
                </p>
              ))}
          </div>
          <button onClick={bookAppointment}>Book an appointment</button>
        </section>
        {/* section3 */}
        <RelatedDoctors docId={docId} specialty={docInfo.specialty} />
      </main>
    )
  );
};

export default Appointment;
