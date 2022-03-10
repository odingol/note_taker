const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');



const app = express();

const PORT = process.env.PORT || 3001 

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// HTML Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


// Part of REQUIREMENT!!! does not get the route for the db.json file for some reason 

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });



// API Routes


// Reads the db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

// Should receive a new note save on the request body, add to the db.json file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {

  const freshNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text
  };

  const readNote = fs.readFileSync("./db/db.json");

  const parsedNote = JSON.parse(readNote);

  parsedNote.push(freshNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(parsedNote));
  res.json(freshNote);
});

app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
  });
  