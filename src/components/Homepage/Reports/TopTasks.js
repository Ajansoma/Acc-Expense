import styles from "./TopTasks.module.css";
const TopTasks = function () {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Top tasks</div>
      <div className={styles["task-1"]}>
        <div>Icon</div>
        <div>task 1</div>
      </div>
      <div className={styles["task-2"]}>
        <div>Icon</div>
        <div>task 2</div>
      </div>
      <div className={styles["task-3"]}>
        <div>Icon</div>
        <div>task 3</div>
      </div>
    </div>
  );
};
export default TopTasks;
