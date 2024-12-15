import React, { useState } from "react";
import logStyles from "./Css/Login.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useAdminContext } from "../context/AdminContext";
import { useDoctorContext } from "../context/DoctorContext";

const Login = () => {
  const { setAToken, backendUrl } = useAdminContext();
  const { setDToken } = useDoctorContext();

  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className={logStyles.login}>
      <form onSubmit={submitHandler} className={logStyles.login_form}>
        <p>
          <span>{state}</span> Login
        </p>
        <div className={logStyles.email}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </label>
        </div>
        <div className={logStyles.password}>
          <label htmlFor="pass">
            Password
            <input
              type={showPass ? "text" : "password"}
              id="pass"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </label>
          <label htmlFor="hideShowPass">
            <input
              type="checkbox"
              id="hideShowPass"
              checked={showPass}
              onChange={() => setShowPass(!showPass)}
            />
            Show Password
          </label>
        </div>
        <button type="submit">Login</button>
        {state ==="Admin" ? (
            <p>You are a Doctor? <span onClick={()=> setState("Doctor")}>Click here</span></p>
        ) :(
            <p>You are a Admin? <span onClick={()=> setState("Admin")}>Click here</span></p>
        )}
      </form>
    </section>
  );
};

export default Login;
