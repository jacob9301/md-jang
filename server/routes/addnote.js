const express = require('express');
router = express.Router();
const Note = require('../models/notes');

const addnote = async (req, res) => {
    
    const userId = req.user.id;

    const newNote = new Note({
        title: req.body.title,
        body: req.body.body,
        owner: userId
    });
    
    try {
        const doc = await newNote.save();

        if (doc == newNote) {
            return res.json({success: true, message: ''});
        } else {
            return res.json({success: false, message: 'Something went wrong'});
        }
    } catch (err) {
        return res.json({success: false, message: 'Something went wrong'});
    }
};

module.exports = addnote;