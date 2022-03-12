const router = require("express").Router();
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');



// API Routes

// Reads the db.json file and return all saved notes as JSON
router.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, '../db/db.json'));
})

// Should receive a new note save on the request body, add to the db.json file, and then return the new note to the client.
router.post("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const readNote = fs.readFileSync("./db/db.json");
  const parsedNote = JSON.parse(readNote);
  const found = parsedNote.some(note => note.id === req.params.id);

  if (found) {
  fs.writeFileSync("./db/db.json", JSON.stringify(parsedNote.filter(note => note.id !== req.params.id), null, 4))
    res.json({
      mssg: "Note has been removed",
      notes: parsedNote.filter(note => note.id !== req.params.id)
    });
  } else {
    res.status(400).json({mssg: `No note with the ID of: ${req.params.id}`});
  }
});

module.exports = router;
