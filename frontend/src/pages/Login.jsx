import React, { useState, useEffect } from "react";
import logStyles from "./Css/Login.module.css";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const LoginSignupForm = () => {
  const { backendUrl, token, setToken } = useAppContext();

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <section className={logStyles.wrapper}>
      <div className={logStyles.login}>
        <figure className={logStyles.login_left}>
          <img src={assets.login_img} loading="lazy" />
        </figure>
        <form onSubmit={submitHandler} className={logStyles.login_right}>
          <h3>{state === "Login" ? "Login" : "Create account"}</h3>
          <div className={logStyles.input_holder}>
            {state === "Sign Up" && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className={logStyles.password_fields_holder}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
            <button type="submit">{state === "Login" ? "Login" : "Create account"}</button>
          </div>
          {state === "Sign Up" && (
            <div className={logStyles.policy_holder}>
              <input type="checkbox" required />
              <p>By continuing, i agree to the term of use & privacy policy</p>
            </div>
          )}
          <div className={logStyles.login_signup_switch}>
            {state === "Login" ? (
              <p>
                New on our platform?{" "}
                <span onClick={() => setState("Sign Up")}>Create account</span>
              </p>
            ) : (
              <p>
                Already with us?{" "}
                <span onClick={() => setState("Login")}>Login here</span>
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginSignupForm;
