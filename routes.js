const express = require('express');
const router = express.Router();
const items = require('./fakeDB');

// GET /items
router.get('/items', (req, res) => {
  res.json(items);
});

// POST /items
router.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({ added: newItem });
});

// GET /items/:name
router.get('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const foundItem = items.find(item => item.name === itemName);
  if (foundItem) {
    res.json(foundItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// PATCH /items/:name
router.patch('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const updateItem = req.body;
  const foundIndex = items.findIndex(item => item.name === itemName);
  if (foundIndex !== -1) {
    items[foundIndex] = { ...items[foundIndex], ...updateItem };
    res.json({ updated: items[foundIndex] });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE /items/:name
router.delete('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const foundIndex = items.findIndex(item => item.name === itemName);
  if (foundIndex !== -1) {
    items.splice(foundIndex, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

module.exports = router;
