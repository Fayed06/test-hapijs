const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const contacts = [];

// Create new contacts
app.post('/contacts', (req, res) => {
  const contact = req.body;
  contact.id = contacts.length + 1;
  contacts.push(contact);
  res.status(201).json(contact);
});

// List of contacts
app.get('/contacts', (req, res) => {
  res.status(200).json(contacts);
});

// Delete contacts
app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const index = contacts.findIndex(contact => contact.id == id);
  if (index !== -1) {
    const deleted = contacts.splice(index, 1);
    res.status(200).json(deleted[0]);
  } else {
    res.status(404).send();
  }
});

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});