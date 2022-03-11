const router = require("express").Router();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');



// API Routes

// Reads the db.json file and return all saved notes as JSON
router.get("/notes", (req, res) => {
 res.sendFile(path.join(__dirname, '../db/db.json'));
})

// Should receive a new note save on the request body, add to the db.json file, and then return the new note to the client.
router.post("/notes", (req, res) => {
  const freshNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  };

  const readNote = fs.readFileSync("./db/db.json");

  const parsedNote = JSON.parse(readNote);

  parsedNote.push(freshNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(parsedNote));
  res.json(freshNote);
});

router.delete("/notes/:id", (req, res) => {
  const readNote = fs.readFileSync("./db/db.json");
  const parsedNote = JSON.parse(readNote);

  if (parsedNote.some((note) => note.id === parseInt(req.params.id))) {
    res.json({
      mssg: "Note has been removed",
      Notes: parsedNote.filter((note) => note.id !== parseInt(req.params.id)),
    });
  }
});

module.exports = router;
