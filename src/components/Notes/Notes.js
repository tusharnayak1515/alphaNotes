import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import notesContext from '../../context/notes/notesContext';
import { Link, useHistory } from 'react-router-dom';

import Button from '../UI/Button';
import NoteItem from './NoteItem';

import styles from './notes.module.css';

const Notes = ({showAlert}) => {
    const context = useContext(notesContext);
    const { notes, getNotes, editNote } = context;
    let history = useHistory();

    const [post, setPost] = useState({id: "", title: "", description: "", tag: ""});

    const addRef = useRef(null);
    const showRef = useRef(null);

    const refClose = useRef(null);
    const showRefClose = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        }
        else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);

    const [enote, setEnote] = useState({ id: "", title: "", description: "", tag: "" });

    const onEditClick = () => {
        editNote(enote);
        refClose.current.click();
        const error = localStorage.getItem("error");
        if(error === null) {
            showAlert("Successfully edited note","Success");
        }
        else {
            showAlert("Editing Note Failed","Failure");
        }
    }

    const onShowClick = () => {
        showRefClose.current.click();
    }

    const onEdit = (currentNote) => {
        addRef.current.click();
        setEnote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
    }

    const onShow = (thisNote) => {
        showRef.current.click();
        setPost({ id: thisNote._id, title: thisNote.title, description: thisNote.description, tag: thisNote.tag });
    }

    const onAddChange = (e) => {
        setEnote({ ...enote, [e.target.name]: e.target.value })
    }

    return (
        <Fragment>

            {/* For viewing the full note */}
            <button ref={showRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel1">Full Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className={styles.form}>
                                <input type="text" placeholder="Title" id="etitle" name="etitle" value={post.title} readOnly />
                                <textarea cols="22" rows="5" type="text" placeholder="Description" id="edescription" name="edescription" value={post.description} readOnly />
                                <input type="text" placeholder="Tag" id="etag" name="etag" value={post.tag} readOnly />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={showRefClose} type="button" onClick={onShowClick} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onShowClick}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* For editing the note */}
            <button ref={addRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className={styles.form}>
                                <input type="text" placeholder="Title" id="title" name="title" value={enote.title} onChange={onAddChange} />
                                <textarea cols="22" rows="5" type="text" placeholder="Description" id="description" name="description" value={enote.description} onChange={onAddChange} autoComplete="off" />
                                <input type="text" placeholder="Tag" id="tag" name="tag" value={enote.tag} onChange={onAddChange} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={onEditClick}>Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id={styles.container}>
                <div id={styles.addnote}>
                    <Button><Link to="/addNote">Add Note</Link></Button>
                </div>
                <div id={styles.notes}>
                    <h1>My Notes</h1>
                    {notes.length === 0 && <p className={styles.noNotes}>No notes to display</p>}
                    <div id={styles.item}>
                        {notes.map((note) => {
                            return (<NoteItem key={note._id} note={note} onEdit={onEdit} onShow={onShow} setPost={setPost} />)
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Notes;
