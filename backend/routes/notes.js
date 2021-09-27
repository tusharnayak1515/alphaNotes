const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchuser");

// ROUTE-1: Get all the notes using: GET "/api/notes/fetchallnotes". Require Login
router.get('/fetchallnotes', fetchUser, async(req, res)=> {
    let success = false;
    try {
        const notes = await Note.find({user: req.user.id});
        success = true;
        res.json({success, notes});
    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

// ROUTE-2: Add a new note using: POST "/api/notes/addnote". Require Login
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min:3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min:5 })
], async(req, res)=> {
    let success = false;
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            success = false;
            return res.json({ success, errors: errors.array() , status: 400 })
        }
        const note = new Note({
            title,description,tag,user: req.user.id
        })
        const savedNote = await note.save();
        success = true;
        res.json({success, savedNote, status: 200});

    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

// ROUTE-3: Update an existing note using: PUT "/api/notes/updatenote". Require Login
router.put('/updatenote/:id', fetchUser, async(req, res)=> {
    let success = false;
    try {
        const {title,description,tag} = req.body;
        let newNote = {title: "", description: "", tag: ""};
        if(title) {
            newNote.title = title;
        }
        if(description) {
            newNote.description = description;
        }
        if(tag) {
            newNote.tag = tag;
        }
        let note = await Note.findById(req.params.id);
        if(!note) {
            success = false;
            return res.send({success, error: "Not Found", status: 404});
        }

        if(note.user.toString() !== req.user.id) {
            success = false;
            return res.send({success, error: "This is not allowed", status: 401})
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        success = true;
        res.json({success, note, status: 200}); 

    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

// ROUTE-4: Delete an existing note using: DELETE "/api/notes/deletenote". Require Login
router.delete('/deletenote/:id', fetchUser, async(req, res)=> {
    let success = false;
    try {
        let note = await Note.findById(req.params.id);
        if(!note) {
            success = false;
            return res.send({success, error: "Not Found", status: 404});
        }

        if(note.user.toString() !== req.user.id) {
            success = false;
            return res.send({success, error: "This is not allowed", status: 401})
        }

        note = await Note.findByIdAndDelete(req.params.id);
        success = true;
        res.json({success, note, status: 200}); 

    } catch (error) {
        success = false;
        res.send({success, error: "Internal Server Error", status: 500});
    }
});

// ROUTE-5: Getting the full post using: GET "/api/notes/:id". Require Login
// router.get('/:id', fetchUser, async(req, res)=> {
//     let success = false;
//     try {
//         let note = await Note.findById(req.params.id);
//         if(!note) {
//             success = false;
//             return res.send({success, error: "Not Found", status: 404});
//         }

//         if(note.user.toString() !== req.user.id) {
//             success = false;
//             return res.send({success, error: "This is not allowed", status: 401})
//         }

//         success = true;
//         res.json({success, note, status: 200}); 

//     } catch (error) {
//         success = false;
//         res.send({success, error: "Internal Server Error", status: 500});
//     }
// });

module.exports = router;