"use Client";
import React, { useState } from "react";
import styles from "./check.module.css";

const CheckBox = ({ label, id, checked, onChange }) => {
  // If you want the checkbox to manage its own state, uncomment the following lines
  // const [isChecked, setIsChecked] = useState(checked || false);

  // const handleOnChange = (e) => {
  //   setIsChecked(e.target.checked);
  //   if (onChange) {
  //     onChange(e.target.checked);
  //   }
  // };

  return (
    <div className={styles.checkboxContainer}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange} // Use handleOnChange if the checkbox manages its own state
        className={styles.checkboxInput}
      />
      <label htmlFor={id} className={styles.checkboxLabel}>
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
