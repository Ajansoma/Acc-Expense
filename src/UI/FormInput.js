import styles from "./Input.module.css";

const FormInput = (props) => {
  const { className, label, name, register, type, required, value } = props;
  return (
    <div>
      <label>{label}</label>
      <input
        className={className}
        type={type || "text"}
        value={value}
        {...register(name, { required })}
      />
    </div>
  );
};

export default FormInput;
