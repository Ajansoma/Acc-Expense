import { useState } from "react";
import styles from "./TodoForm.module.css";

const TodoForm = function (props) {
  const [enteredTask, setEnteredTask] = useState("");
  const [taskValidity, setTaskValidity] = useState("");

  const enteredTaskHandler = function (e) {
    setEnteredTask(e.target.value);
  };

  const submitTaskHandler = function (e) {
    e.preventDefault();

    setEnteredTask("");
    if (enteredTask === "") {
      setTaskValidity(
        <p className={styles.invalid}>Sorry, you can't sumbit an empty task</p>
      );
    }
    if (enteredTask.length > 0) {
      const tasks = {
        id: Math.floor(Math.random() * 100).toString(),
        task: enteredTask,
      };
      props.onAddTask(tasks);
    }
  };

  const focusHandler = function () {
    setTaskValidity("");
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitTaskHandler}
      onFocus={focusHandler}
    >
      <label htmlFor="todo">Top 3 tasks</label>
      <input
        id="todo"
        type="text"
        onChange={enteredTaskHandler}
        value={enteredTask}
      />
      {taskValidity}
      <div className={styles["btn"]}>
        <button className={styles["add-task"]} type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
};
export default TodoForm;
