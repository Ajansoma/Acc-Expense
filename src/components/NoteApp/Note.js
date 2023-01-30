import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-form/useHttp";
import NoteList from "./NoteList";
import NoteForm from "./NoteForm";
import Search from "./Search";
import styles from "./Note.module.css";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const Note = function () {
  //localstorage
  const getData = localStorage.getItem("notes");
  const localData = getData ? JSON.parse(getData) : [];

  //states
  const [notes, setNotes] = useState(localData);
  const [query, setQuery] = useState("");
  const [enteredData, setEnteredData] = useState([]);
  const [newInput, setNewInput] = useState([]);

  const { isLoading, sendRequest: getRequest } = useHttp();

  const { noteId } = useParams();
  const selectedNote = notes.find((note) => note.id === noteId);

  useEffect(() => {
    const transformedTasks = function (tasksData) {
      const loadedTasks = [];

      for (const key in tasksData) {
        loadedTasks.push({
          id: key,
          title: tasksData[key].title,
          body: tasksData[key].body,
          date: tasksData[key].date,
        });
      }
      setNotes(loadedTasks);
    };

    getRequest(
      {
        url: `https://acc-app-3d7ab-default-rtdb.firebaseio.com/tasks.json`,
      },
      transformedTasks
    );
  }, [getRequest]);

  console.log(notes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const noteHandler = function (noteData) {
    // setNotes((prevState) => [noteData, ...prevState]);
    setEnteredData((prevState) => [noteData, ...prevState]);
  };

  const queryHandler = function (query) {
    setQuery(query);
  };

  const changeInputHandler = function (newInput) {
    setNewInput(newInput);
  };

  const deleteHandler = function (id) {
    setNotes((prevList) => prevList.filter((note) => note.id !== id));
  };

  let displayNotes;
  if (notes.length > 0) {
    displayNotes = (
      <NoteList
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
