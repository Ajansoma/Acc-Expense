import { useState } from "react";
import styles from "./TodoItem.module.css";

const TodoItem = function (props) {
  const [strike, setStrike] = useState(false);
  const deleteTaskHandler = function () {
    const index = props.listData.findIndex((index) => index.id === props.id);
    const deleteItem = props.listData[index];
    props.onDelete(deleteItem);
  };

  const strikeTask = function () {
    setStrike((prevState) => !prevState);
  };

  const taskStyle = strike ? `${styles.strike}` : "";

  return (
    <div className={styles.container} onClick={strikeTask}>
      <div className={taskStyle}>{props.task}</div>
      <ion-icon name="trash-outline" onClick={deleteTaskHandler}></ion-icon>
    </div>
  );
};
export default TodoItem;
