import React from "react";
import spinnerStyles from "./Spinner.module.css";

const Spinner = ({ textVisible }) => {
  return (
    <div className={spinnerStyles.container}>
      <div className={spinnerStyles.spinner_wrapper}>
        <div className={spinnerStyles.dot}></div>
        <div className={spinnerStyles.dot}></div>
        <div className={spinnerStyles.dot}></div>
        <div className={spinnerStyles.dot}></div>
      </div>
      {textVisible && <p className={spinnerStyles.text}>Loading MediBook </p>}
    </div>
  );
};

export default Spinner;
