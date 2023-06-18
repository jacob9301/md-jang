const Note = require('../models/notes');

const getallnotes = async (req, res) => {

    const userId = req.user.id;

    try {
        const notes = await Note.find({owner: userId}).select('title').sort({updatedAt: 'desc'});
        return res.json({success: true, notes: notes});
    } catch (err) {
        return res.json({success: false});
    }


};

module.exports = getallnotes;