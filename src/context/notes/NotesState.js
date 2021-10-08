import { useState } from "react";
import NotesContext from "./notesContext";

const NotesState = (props) => {
    const server = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    const getNotes = async () => {
        const response = await fetch(`${server}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        if (json.success) {
            setNotes(json.notes);
            localStorage.removeItem("error");
        }
        else {
            localStorage.setItem("error", json.error);
        }
    }

    const addNote = async ({ title, description, tag }) => {
        const response = await fetch(`${server}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();

        if (note.success) {
            setNotes(notes.concat(note.savedNote));
            localStorage.removeItem("error");
        }
        else {
            localStorage.setItem("error", note.error);
        }

    }

    const editNote = async ({ id, title, description, tag }) => {
        const response = await fetch(`${server}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        if (json.success) {
            localStorage.removeItem("error");
            let newNotes = await JSON.parse(JSON.stringify(notes));

            for (let i = 0; i < notes.length; i++) {
                const element = notes[i];
                if (element._id === id) {
                    newNotes[i].title = title;
                    newNotes[i].description = description;
                    newNotes[i].tag = tag;
                    break;
                }
            }
            setNotes(newNotes);
        }
        else {
            localStorage.setItem("error", json.error);
        }

    }

    const deleteNote = async (id) => {
        const response = await fetch(`${server}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json();
        if (json.success) {
            const newNotes = notes.filter((note) => { return note._id !== id });
            setNotes(newNotes);
            localStorage.removeItem("error");
        }
        else {
            localStorage.setItem("error", json.error);
        }

    }

    return (
        <NotesContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NotesState;