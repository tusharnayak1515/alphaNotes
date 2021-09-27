import React, { useContext } from "react";
import notesContext from "../../context/notes/notesContext";

import styles from "./noteItem.module.css";

const NoteItem = ({ note, onEdit, onShow }) => {
  
  const context = useContext(notesContext);
  const { deleteNote } = context;

  return (
    <div className={styles.card}>
      <div className={styles.item}>
        <h2>{note.title}</h2>
        <i
          className="fas fa-trash"
          onClick={() => {
            deleteNote(note._id);
          }}
        ></i>
        <i
          className="far fa-edit"
          onClick={() => {
            onEdit(note);
          }}
        ></i>
      </div>
      {note.description.length <= 200 ? (
        <p>{note.description}</p>
      ) : (
        <p>
          {note.description.slice(0, 100)}...
          <span
            onClick={() => {
              onShow(note);
            }}
          >
            Read More
          </span>
        </p>
      )}
    </div>
  );
};

export default NoteItem;
