const noteData = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(noteData));

    const updateDb = () => {
        fs.writeFile('db/db.json', JSON.stringify(noteData), err => {
            if (err) throw err;
            return true;
        });
    }

    app.post('/api/notes', (req, res) => {
        
        const newNote = req.body;

        newNote.id = uuidv4();
        noteData.push(newNote);
        res.json(newNote);
        updateDb();

    });

    // app.get('/api/notes/:id', (req, res) => {
    //     res.json(noteData[req.params.id]);
    // });

};