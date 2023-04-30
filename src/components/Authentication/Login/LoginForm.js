import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../../../Store/auth-context";
import FormInput from "../../../UI/FormInput";
import styles from "./LoginForm.module.css";
import LoadingSpinner from "../../../UI/LoadingSpinner";

const schema = yup
  .object({
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
  })
  .required();

const ExpenseForm = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);
  const history = useHistory();
  const userDetails = authContext.login;

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

  const submitForm = useCallback(function (data) {
    signInWithEmailAndPassword(auth, data.emailAddress, data.password)
      .then((userCredential) => {
        setIsLoading(true);
        const user = userCredential.user;
        authContext.loginHandler(user);

        if (user) {
          history.replace("/");
        }
      })
      .catch((error) => {
        setError(true);
      });

    setIsLoading(false);
    reset();
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userDetails));
  }, [userDetails]);

  return (
    <form className={styles.login} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.welcome}>
        <h3>Welcome to WeAccount</h3>
        <div className={styles["create-account"]}>
          <div>
            New to WeAccount?
            <Link to="/signup" className={styles.account}>
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <p className={styles["invalid-form"]}>Wrong email or Password</p>
      )}
      <FormInput
        label="Email Address"
        name="emailAddress"
        register={register}
        className={styles.email}
      />
      <p className={styles["invalid-form"]}>{errors.emailAddress?.message}</p>
      <FormInput
        label="Password"
        name="password"
        className={styles.password}
        register={register}
      />
      <p className={styles["invalid-form"]}>{errors.password?.message}</p>

      <div className={styles.reset}>
        {/* <div className={styles.remember}>
          <input type="checkbox" className={styles.checkbox} />
          <p> Remember this device</p>
        </div> */}
        <Link to="/signup" className={styles["forgot-password"]}>
          Forgot Password?
        </Link>
      </div>
      <button type="submit" className={styles.btn}>
        {!isLoading && <p> Sign In</p>}
        {isLoading && <LoadingSpinner />}
      </button>
    </form>
  );
};
export default ExpenseForm;
