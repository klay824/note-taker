const noteData = require('../db/db.json');
const fs = require('fs');

// allows use of uuid
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    // retrieves new note and saves it to the db (noteData)
    app.get('/api/notes', (req, res) => res.json(noteData));

    // function to update the database
    const updateDb = () => {
        fs.writeFile('db/db.json', JSON.stringify(noteData), err => {
            if (err) throw err;
            return true;
        });
    }

    // creates /api/notes/:id so that users can look at individual objects in the notes array by putting the unique id after /api/notes/
    app.get('/api/notes/:id', (req, res) => {
        const activeNote = req.params.id;
        console.log(activeNote);

        for (let i = 0; i < noteData.length; i++){
            
            if (activeNote === noteData[i].id){
                return res.json(noteData[i]);
            }
        }
        
    });

    // gives each new note a unique ID with uuid
    app.post('/api/notes', (req, res) => {
        
        const newNote = req.body;

        newNote.id = uuidv4();
        noteData.push(newNote);
        res.json(newNote);
        updateDb();

    });

    // deletes notes based on their unique ID
    app.delete('/api/notes/:id', (req, res) => {
        noteData.splice(req.params.id, 1);
        res.json(noteData);
        updateDb();
    });
};