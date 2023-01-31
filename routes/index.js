const express = require('express');

const app = express();

app.get('/notes', (req, res) => {
  //TODO: read db.json, return all notes as json
});

app.post('/notes', (req, res) => {
  //TODO: receive new note, add to db.json, return note
});

app.delete('/notes/:id', (req, res) => {
  //TODO: receive path param :id, remove note with matching id
});

module.exports = app;