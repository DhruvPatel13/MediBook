import React, { useState, useEffect } from "react";
import myApStyles from "./Css/MyAppointments.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useAppContext();

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (e) {
          console.log(e);
          toast.error(e.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <main className={myApStyles.my_appointments}>
      <h1>My Appointments</h1>
      <hr />
      <section className={myApStyles.appointments_holder}>
        {!appointments[1] && <p>No Appointments yet.</p>}
        {appointments.map((item, idx) => (
          <div className={myApStyles.appointment} key={idx}>
            <figure className={myApStyles.app_left}>
              <img src={item.docData.image} loading="lazy" />
            </figure>
            <div className={myApStyles.app_center}>
              <p>{item.docData.name}</p>
              <p>{item.docData.specialty}</p>
              <p>Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p>
                <span>Date & Time:</span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className={myApStyles.app_right}>
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button>Paid</button>
              )}
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button onClick={() => appointmentRazorpay(item._id)}>
                  Pay online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button onClick={() => cancelAppointment(item._id)}>
                  Cancel appointment
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button>Appointment cancelled</button>
              )}

              {item.isCompleted && <button>Completed</button>}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MyAppointments;
