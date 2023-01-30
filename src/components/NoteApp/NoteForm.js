import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-form/useHttp";
import styles from "./NoteForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";

const NoteForm = function (props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredNotes, setEnteredNotes] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { isLoading, sendRequest } = useHttp();

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
    setEnteredNotes(e.target.value);
  };

  const transformedTask = function (tasks, taskData) {
    const generatedId = taskData.id;
    const generatedTasks = {
      id: generatedId,
      title: tasks.title,
      body: tasks.body,
      date: date.date,
    };
  };

  const submitFormHandler = function (e) {
    e.preventDefault();

    const data = {
      title: enteredTitle,
      body: enteredNotes,
      date: date,
    };

    const options = {
      url: `https://acc-app-3d7ab-default-rtdb.firebaseio.com/tasks.json`,
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    };

    if (enteredTitle.trim() !== "" && enteredNotes.trim() !== "") {
      sendRequest(options, transformedTask.bind(null, data));
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (!props.editNote) {
      return;
    }

    setEnteredTitle(props.editNote.title);
    setEnteredNotes(props.editNote.body);
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
          value={enteredNotes}
          disabled={Boolean(props.editNote)}
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
