import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./PurchaseForm.module.css";
import FormInput from "../../UI/FormInput";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useHistory } from "react-router-dom";

const schema = yup
  .object({
    customerName: yup.string().required(),
    customerNumber: yup
      .number()
      .test("len", "Max 10 numbers", (val) => val.toString().length === 10)
      .positive("selling price must be a positive number")
      .typeError("selling price must be a positive number")
      .required(),
    unitName: yup.string().required(),
    sellingPrice: yup
      .number()
      .positive("selling price must be a positive number")
      .typeError("selling price must be a positive number")
      .required(),
    costPrice: yup
      .number()
      .positive("cost price must be a positive number")
      .typeError("cost price must be a positive number")
      .required(),
    date: yup.string().required(),
  })
  .required();

const PurchaseForm = function () {
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
      const res = await addDoc(collection(db, "orders"), {
        ...data,
      });
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);

    if (!error) {
      history.replace("/orders");
    }

    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.sales}>
        <p>purchase form</p>
      </div>
      <FormInput
        label="Customer Name"
        name="customerName"
        register={register}
      />
      <p className={styles.invalid}>{errors.customerName?.message}</p>
      <FormInput
        label="Customer Number"
        name="customerNumber"
        register={register}
      />
      <p className={styles.invalid}>{errors.customerNumber?.message}</p>

      <FormInput label="Unit Name" name="unitName" register={register} />
      <p className={styles.invalid}>{errors.unitName?.message}</p>

      <FormInput
        label="Selling Price"
        name="sellingPrice"
        register={register}
      />
      <p className={styles.invalid}>{errors.sellingPrice?.message}</p>
      <FormInput label="Cost Price" name="costPrice" register={register} />
      <p className={styles.invalid}>{errors.costPrice?.message}</p>
      <FormInput label="Date" name="date" register={register} type="date" />
      <p className={styles.invalid}>{errors.date?.message}</p>

      <div className={styles.btn}>
        {error && <div>Sorry! something went wrong try Again.</div>}
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
export default PurchaseForm;
