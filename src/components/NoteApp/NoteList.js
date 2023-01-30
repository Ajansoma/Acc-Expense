import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-form/useHttp";
import NoteItem from "./NoteItem";
import styles from "./NoteList.module.css";

const NoteList = function (props) {
  const changeInputHandler = function (newInput) {
    props.onChangeInputData(newInput);
  };

  const deleteHandler = function (id) {
    props.onDelete(id);
  };

  let displayList;
  if (
    props.notes.filter((note) => note.body.toLowerCase().includes(props.query))
      .length > 0
  ) {
    displayList = props.notes
      .filter((note) => note.body.toLowerCase().includes(props.query))
      .map((note) => {
        return (
          <NoteItem
            note={note}
            body={note.body.slice(0, 15) + "..."}
            onChangeInputData={changeInputHandler}
            onDelete={deleteHandler}
          />
        );
      });
  } else {
    displayList = <p className={styles.noQuery}>Sorry! No query found!</p>;
  }
  return (
    <div className={styles.list}>
      <div>{displayList}</div>
    </div>
  );
};
export default NoteList;
