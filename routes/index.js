const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.get('/notes', (req, res) => {
  //TODO: read db.json, return all notes as json
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
});

app.post('/notes', (req, res) => {
  //TODO: receive new note, add to db.json, return note
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
    fs.writeFile('./db/db.json', JSON.parse(notesArray), (err) => {
      if (err) throw err;
      res.json(notesArray);
    })
  })
});

app.delete('/notes/:id', (req, res) => {
  //TODO: receive path param :id, remove note with matching id
  console.log('/api/notes/:id DELETE hit');
  res.json('/api/notes/:id DELETE hit');
});

module.exports = app;