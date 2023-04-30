import { useState, useEffect, useContext } from "react";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import { OrderContext } from "../../Store/order-context";
import Search from "./Search";
import styles from "./Note.module.css";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

const Note = function () {
  const [query, setQuery] = useState("");
  const [enteredData, setEnteredData] = useState([]);
  const [newInput, setNewInput] = useState([]);
  const noteCxt = useContext(OrderContext);
  const notes = noteCxt.notes;

  const { noteId } = useParams();
  const selectedNote = notes.find((note) => note.id === noteId);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "notes"),
      (doc) => {
        let loadedNotes = [];
        doc.docs.forEach((doc) => {
          loadedNotes.push({ id: doc.id, ...doc.data() });
        });
        noteCxt.notesHandler(loadedNotes);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const noteHandler = function (noteData) {
    setEnteredData((prevState) => [noteData, ...prevState]);
  };

  const queryHandler = function (query) {
    setQuery(query);
  };

  const changeInputHandler = function (newInput) {
    setNewInput(newInput);
  };

  //delete note
  const deleteHandler = async function (id) {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (err) {
      console.log(err);
    }
    noteCxt.notesHandler((prevList) =>
      prevList.filter((note) => note.id !== id)
    );
  };

  let displayNotes;
  if (notes.length > 0) {
    displayNotes = (
      <NoteList
        key={new Date().getTime().toString()}
        notes={notes}
        query={query}
        data={enteredData}
        onChangeInputData={changeInputHandler}
        onDelete={deleteHandler}
      />
    );
  } else {
    displayNotes = (
      <p className={styles.emptyNote}>Your notes will appear here</p>
    );
  }

  return (
    <div className={styles.note}>
      <div>
        <Search onAddQuery={queryHandler} />
        {displayNotes}
      </div>

      <NoteForm
        key={selectedNote?.id}
        onAddNote={noteHandler}
        newInput={newInput}
        editNote={selectedNote}
      />
    </div>
  );
};
export default Note;
