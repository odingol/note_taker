const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoute');


const app = express();

const PORT = process.env.PORT || 3001 

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/api/notes', apiRoutes);


// HTML Routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.status(404)
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
  });
  