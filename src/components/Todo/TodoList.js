import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

const TodoList = function (props) {
  const deleteTaskHandler = function (deleteTask) {
    props.onDelete(deleteTask);
  };

  return (
    <div className={styles.container}>
      {props.listData.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          task={task.task}
          listData={props.listData}
          onDelete={deleteTaskHandler}
        />
      ))}
    </div>
  );
};
export default TodoList;
