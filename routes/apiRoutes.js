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

    app.get('/db/db.json', (req, res) => res.json(noteData));

    app.get('/api/notes/:id', (req, res) => {
        const activeNote = req.params.id;
        console.log(activeNote);

        for (let i = 0; i < noteData.length; i++){
            
            if (activeNote === noteData[i].id){
                return res.json(noteData[i]);
            }
        }
        
    });

    app.post('/api/notes', (req, res) => {
        
        const newNote = req.body;

        newNote.id = uuidv4();
        noteData.push(newNote);
        res.json(newNote);
        updateDb();

    });

    // app.delete('/api.notes/:id', (req, res) => {
    //     noteData.splice(req.params.id, 1);
    //     updateDb();
    // });

    

};