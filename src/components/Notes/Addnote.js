import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import notesContext from '../../context/notes/notesContext';

import Button from '../UI/Button';

import styles from './addNote.module.css';

const Addnote = ({ showAlert }) => {
    let history = useHistory();
    const context = useContext(notesContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const onAddNote = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({ title: "", description: "", tag: "" });
        history.push("/notes");
        const error = localStorage.getItem("error");
        if (error !== null) {
            showAlert(error, "Failure");
        }
        else {
            showAlert("Note added successfully", "Success");
        }
    }
    return (
        <div id={styles.addnote}>
            <h1>Add a Note</h1>
            <form onSubmit={onAddNote}>
                <input type="text" placeholder="Title" id="title" name="title" value={note.title} onChange={onChange} />
                <textarea cols="22" rows="5" placeholder="Description" id="description" name="description" autoComplete="off" value={note.description} onChange={onChange}></textarea>
                <input type="text" placeholder="Tag" id="tag" name="tag" value={note.tag} onChange={onChange} />
                <Button>Add Note</Button>
            </form>
        </div>
    )
}

export default Addnote
