const fs = require("fs");
const util = require("util");
const uuid = require("uuid");
const dayjs = require("dayjs");
var notes = require("../db/db.json");

module.exports = function (app) {
    app.get("/api/notes", function (_req, res) {
        notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(notes);
      });
     
    app.post("/api/notes", function (req, res) {
        var addNote = req.body;
        addNote.id = uuid.v4()
    addNote.timestamp = dayjs().format();
    notes.push(addNote);
    res.json(addNote);
    fs.writeFileSync('db/db.json', JSON.stringify(notes), function (err, _result) {
        if (err) console.log('error', err);
      });
    });

    app.delete("/api/notes/:id", function (req, res) {
        var id = req.params.id;
        console.log(`Deleting Note : ${id}`);

        const removedNote = notes.find(removedNote => removedNote.id == id);
        const updatedNotes = notes.filter(notes => notes.id != id);

        fs.writeFileSync('db/db.json', JSON.stringify(updatedNotes), function (err, result) {
            if (err) console.log('error', err);
          });
          res.json(removedNote)
        })
    }