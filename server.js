const express = require('express');
const path = require('path');


const app = express();

const PORT = process.env.PORT || 3001 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require('./routes/routes')(app)


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.listen(PORT, () => {
    console.log(`App is running at http://localhost:${PORT}`);
  })
  