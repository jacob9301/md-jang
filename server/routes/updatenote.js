const Note = require('../models/notes');

const updatenote = async (req, res) => {

    const noteId = req.body.noteId;
    const noteBody = req.body.content;
    const userId = req.user.id;

    try{
        const note = await Note.findOneAndUpdate({ _id: noteId, owner: userId },
            { body: noteBody },
            { new: true });
        if (note) {
            return res.json({success:true});
        }
    } catch (err) {
        console.error(err);
    }
    
    return res.json({success:false});

};

module.exports = updatenote;