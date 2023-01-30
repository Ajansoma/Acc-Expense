import { useState, useEffect } from "react";
import styles from "./Todo.module.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = function () {
  const storage = localStorage.getItem("tasks");
  const getStorage = storage ? JSON.parse(storage) : [];
  const [listData, setListData] = useState(getStorage);

  const addTaskHandler = function (task) {
    setListData((prevTask) => [...prevTask, task]);
  };

  //localstorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(listData));
  }, [listData]);

  const deleteTaskHandler = function (selectedTask) {
    setListData((prevTask) =>
      prevTask.filter((task) => task.id !== selectedTask.id)
    );
  };

  let DisplayTask = (
    <TodoList listData={listData} onDelete={deleteTaskHandler} />
  );
  if (listData.length === 0) {
    DisplayTask = (
      <p className={styles["no-task"]}> Your tasks will appear here</p>
    );
  }

  return (
    <div className={styles.container}>
      <TodoForm onAddTask={addTaskHandler} />
      {DisplayTask}
    </div>
  );
};
export default Todo;
