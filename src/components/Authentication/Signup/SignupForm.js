import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../../../UI/FormInput";
import styles from "./SignupForm.module.css";
import LoadingSpinner from "../../../UI/LoadingSpinner";

const schema = yup
  .object({
    username: yup.string("username is a required field").required(),
    emailAddress: yup
      .string("Email Address is invalid")
      .email("Email Address is invalid")
      .typeError("Email Address is invalid")
      .required("Email Address is invalid"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain One Uppercase, Lowercase, Number and Special Case Character"
      ),
    confirmPassword: yup
      .string()
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required();

const SignUpForm = function () {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const submitForm = function (data) {
    createUserWithEmailAndPassword(auth, data.emailAddress, data.password)
      .then((userCredential) => {
        setIsLoading(true);
        const user = userCredential.user;
        if (user) {
          history.replace("/login");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        setIsLoading(false);
      });

    reset();
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.welcome}>
        <h3>Welcome to WeAccount</h3>
        <div className={styles["log-in"]}>
          <div>
            Already have an Account?
            <Link to="/login" className={styles.signin}>
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <FormInput label="Username" name="username" register={register} />
      <p className={styles["invalid-form"]}>{errors.username?.message}</p>
      <FormInput
        label="Email Address"
        name="emailAddress"
        register={register}
      />
      <p className={styles["invalid-form"]}>{errors.emailAddress?.message}</p>
      <FormInput label="Password" name="password" register={register} />
      <p className={styles["invalid-form"]}>{errors.password?.message}</p>
      <FormInput
        label="Confrim password"
        name="confirmPassword"
        register={register}
      />
      <p className={styles["invalid-form"]}>
        {errors.confirmPassword?.message}
      </p>

      <button type="submit" className={styles.btn}>
        {!isLoading && <p> Sign Up</p>}
        {isLoading && <LoadingSpinner />}
      </button>
    </form>
  );
};
export default SignUpForm;
