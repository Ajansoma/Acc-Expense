import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import styles from "./ExpenseForm.module.css";
import FormInput from "../../UI/FormInput";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingSpinner from "../../UI/LoadingSpinner";

const schema = yup
  .object({
    adExpenses: yup
      .number()
      .positive("Ad Expenses must be a positive number")
      .typeError("Ad Expenses must be a positive number")
      .required(),
    otherExpenses: yup
      .number()
      .positive("Other Expenses must be a positive number")
      .typeError("Other Expenses must be a positive number")
      .required(),
    // totalExpenses: yup
    //   .number()
    //   .positive("Total Expenses must be a positive number")
    //   .typeError("Total Expenses must be a positive number")
    //   .required(),
    date: yup.string().required(),
  })
  .required();

const ExpenseForm = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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

  const submitForm = async function (data) {
    setIsLoading(true);
    try {
      const res = await addDoc(collection(db, "expenses"), {
        ...data,
        totalExpenses: +data.adExpenses + +data.otherExpenses,
      });
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);

    if (!error) {
      history.replace("/");
    }
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.sales}>
        <p>Expenses form</p>
      </div>
      <FormInput label="Ad Expenses" name="adExpenses" register={register} />
      <p className={styles.invalid}>{errors.adExpenses?.message}</p>
      <FormInput
        label="Other Expenses"
        name="otherExpenses"
        register={register}
      />

      {/* <p className={styles.invalid}>{errors.otherExpenses?.message}</p>
      <FormInput
        label="Total Expenses"
        name="totalExpenses"
        register={register}
      /> */}
      <p className={styles.invalid}>{errors.totalExpenses?.message}</p>

      <FormInput label="Date" name="date" register={register} type="date" />
      <p className={styles.invalid}>{errors.date?.message}</p>

      <div className={styles.btn}>
        <button className={styles.cancel} type="button" onClick={() => reset()}>
          cancel
        </button>
        <button className={styles.submit} type="submit">
          {!isLoading && <div>submit</div>}
          {isLoading && <LoadingSpinner />}
        </button>
      </div>
    </form>
  );
};
export default ExpenseForm;
