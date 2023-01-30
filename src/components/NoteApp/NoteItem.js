import styles from "./NoteItem.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const NoteItem = function (props) {
  const note = props.note;

  const trashHandler = function () {
    props.onDelete(props.id);
  };

  return (
    <Link to={`/notes/${note.id}`}>
      <div className={styles.list}>
        <ul>
          <li className={styles.listDisplay}>
            <div className={styles.trashDisplay}>
              <div>
                <div className={styles.title}>{note.title}</div>
                <div className={styles.body}>{note.body}</div>
              </div>
              <div className={styles.trash} onClick={trashHandler}>
                <ion-icon name="trash-outline"></ion-icon>
              </div>
            </div>
            <div className={styles.date}>{note.date}</div>
          </li>
        </ul>
      </div>
    </Link>
  );
};
export default NoteItem;
