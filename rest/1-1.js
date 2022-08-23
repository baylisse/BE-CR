//For each of the routes we have created for you, make the route restful, so that it behaves per the tests and comments.
// Only change the method / url, so that 
// the verb is in the method
// the noun is in the url (make sure it’s plural!)

const express = require('express');
const app = express();
app.use(express.json());

// we don't have a database, but here is the Plain JS version of our data!
let produce = [
    { name: 'Carrot', color: 'orange', type: 'vegetable' },
    { name: 'Celery', color: 'green', type: 'vegetable' },
    { name: 'Eggplant', color: 'purple', type: 'vegetable' },
    { name: 'Cherry', color: 'red', type: 'fruit' },
    { name: 'Apple', color: 'red', type: 'fruit' },
    { name: 'Banana', color: 'yellow', type: 'fruit' },
    { name: 'Blueberry', color: 'blue', type: 'fruit' },
    { name: 'Kumquat', color: 'green', type: 'fruit' },
  ];

// route 1 - sends back all items

app.get('/items', (req, res) => {
    res.send(produce);
});

// route 2 - adds an item to the array

app.post('/items', (req, res) => {
    const { name, color, type } = req.body;
    produce.push({ name, color, type });
    res.send(produce);
});

// route 3 - edits an item by id (index)

app.put('/items/:id', (req, res) => {
    const {color} = req.body;
    produce[req.params.id].color = color;
    res.send(produce);
});

// route 4 - deletes an item by id (index)

app.delete("/items/:id", (req, res) => {
    produce = produce.filter((item, idx) => idx !== Number(req.params.id));
    res.send(produce);
});

module.exports = app