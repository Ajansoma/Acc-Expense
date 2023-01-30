import styles from "./SelectedOrder.module.css";

const SelectedOrder = function (props) {
  let isDeleted = false;
  const deleteHandler = function () {
    isDeleted = true;
    props.deleteSelectedItem(isDeleted);
  };

  const selected = `${props.selectedItem.length} selected`;
  return (
    <div className={styles["selected-order"]}>
      <div>{selected}</div>
      <ion-icon name="trash-outline" onClick={deleteHandler}></ion-icon>
    </div>
  );
};
export default SelectedOrder;
