import styles from "./NoteItem.module.css";
import { Link } from "react-router-dom";
const NoteItem = function (props) {
  const note = props.note;

  const trashHandler = function () {
    props.onDelete(note.id);
  };

  return (
    <div className={styles.list}>
      <Link to={`/notes/${note.id}`}>
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
      </Link>
    </div>
  );
};
export default NoteItem;
