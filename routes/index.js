const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
});

app.post('/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    id: uuidv4(),
    title,
    text
  };
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    const notesArray = JSON.parse(data);
    notesArray.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => {
      if (err) throw err;
      res.json(notesArray);
    })
  })
});

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    const notesArray = JSON.parse(data);
    let matchingIndex = -1;
    for (let i = 0; i < notesArray.length; i++) {
      if (notesArray[i].id === id) {
        matchingIndex = i;
        break;
      }
    }

    if (matchingIndex === -1) {
      return;
    } else {
      notesArray.splice(matchingIndex, 1);
      fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err) => {
        if (err) throw err;
        res.status(204);
      })
    }
  })
  console.log(`/api/notes/${id} DELETE hit`);
  res.json(`/api/notes/${id} DELETE hit`);
});

module.exports = app;