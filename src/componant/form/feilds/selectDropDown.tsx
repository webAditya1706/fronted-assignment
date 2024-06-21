import { ErrorMessage, Field } from "formik";
import React from "react";
interface props {
	name: string;
	label:string
  }
  
const SelectDropDown = ({name,label}:props) => {
  return (
    <div className="mb-3">
      <label htmlFor="selectedOption" className="form-label fw-bold">{label}</label>
      <Field as="select" name={name} className="form-select">
        <option value="" label="Open this select menu" />
        <option value="user" label="User" />
        <option value="admin" label="Admin" />
      </Field>
      <ErrorMessage component={"div"} name={name} className="error" />
    </div>
  );
};

export default SelectDropDown;
