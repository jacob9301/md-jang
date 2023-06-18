const Note = require('../models/notes');

const getcurrentnote =  async (req, res) => {

    const noteId = req.params.noteId;
    const userId = req.user.id;

    try {
        const note = await Note.findOne({ _id: noteId, owner: userId }).select('title body');
        return res.json({success: true, note: note});
    } catch (err) {
        return res.json({success: false});
    }
};


module.exports = getcurrentnote;