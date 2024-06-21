import { ErrorMessage, Field } from "formik";

interface props {
  label: string;
  name: string;
  type: string;
}

const InputField = ({ label, name, type }: props) => {
  return (
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
        {label}
      </label>
      <Field
        type={type}
        className="form-control"
        id={name}
        name={name}
        aria-describedby="emailHelp"
      />
      <div>
        <ErrorMessage component={"div"} name={name} className="error" />
      </div>
    </div>
  );
};

export default InputField;
