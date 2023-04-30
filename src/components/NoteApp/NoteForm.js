import { useState, useEffect } from "react";
import styles from "./NoteForm.module.css";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import LoadingSpinner from "../../UI/LoadingSpinner";

const NoteForm = function (props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredBody, setEnteredBody] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const now = new Date();
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const date = new Intl.DateTimeFormat("en-GB", { options }).format(now);

  const titleHandler = function (e) {
    setEnteredTitle(e.target.value);
  };

  const notesHandler = function (e) {
    setEnteredBody(e.target.value);
  };

  // const transformedTask = function (tasks, taskData) {
  //   const generatedId = taskData.id;
  //   const generatedTasks = {
  //     id: generatedId,
  //     title: tasks.title,
  //     body: tasks.body,
  //     date: date.date,
  //   };
  // };

  const submitFormHandler = async function (e) {
    e.preventDefault();

    const data = {
      title: enteredTitle,
      body: enteredBody,
      date: date,
    };

    // const options = {
    //   url: `https://acc-app-3d7ab-default-rtdb.firebaseio.com/tasks.json`,
    //   method: "POST",
    //   body: data,
    //   headers: { "Content-Type": "application/json" },
    // };

    // if (enteredTitle.trim() !== "" && enteredNotes.trim() !== "") {
    //   sendRequest(options, transformedTask.bind(null, data));
    // } else {
    //   setIsValid(false);

    setIsLoading(true);
    try {
      const res = await addDoc(collection(db, "notes"), {
        ...data,
      });
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);

    setEnteredBody("");
    setEnteredTitle("");
  };

  useEffect(() => {
    if (!props.editNote) {
      return;
    }

    setEnteredTitle(props.editNote.title);
    setEnteredBody(props.editNote.body);
  }, [props.editNote]);

  return (
    <form
      onSubmit={submitFormHandler}
      className={styles.form}
      onFocus={() => setIsValid(true)}
    >
      <div className={styles.title}>
        <label htmlFor="notes"></label>
        <input
          type="text"
          id="notes"
          placeholder="Title"
          value={enteredTitle}
          onChange={titleHandler}
        />
      </div>
      <div className={styles.note}>
        <textarea
          placeholder="Enter New Notes"
          onChange={notesHandler}
          id="body"
          value={enteredBody}
          // disabled={Boolean(props.editNote)}
        ></textarea>
      </div>
      {!isValid && (
        <div className={styles.invalid}>
          Sorry, you can't submit empty notes
        </div>
      )}
      <button type="submit" className={styles.button}>
        {isLoading && (
          <div className={styles.spinner}>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && <div>Add Note</div>}
      </button>
    </form>
  );
};
export default NoteForm;
